package data

import (
	"blog-demo/models"
	"encoding/json"
	"os"
	"sync"
	"time"
)

const dataFile = "data/posts.json"

type Store struct {
	mu    sync.RWMutex
	posts map[string]*models.Post
}

func NewStore() *Store {
	s := &Store{
		posts: make(map[string]*models.Post),
	}
	s.load()
	return s
}

func (s *Store) load() error {
	s.mu.Lock()
	defer s.mu.Unlock()

	data, err := os.ReadFile(dataFile)
	if err != nil {
		if os.IsNotExist(err) {
			return nil
		}
		return err
	}

	var posts []*models.Post
	if err := json.Unmarshal(data, &posts); err != nil {
		return err
	}

	for _, post := range posts {
		s.posts[post.ID] = post
	}
	return nil
}

func (s *Store) save() error {
	posts := make([]*models.Post, 0, len(s.posts))
	for _, post := range s.posts {
		posts = append(posts, post)
	}

	data, err := json.MarshalIndent(posts, "", "  ")
	if err != nil {
		return err
	}

	return os.WriteFile(dataFile, data, 0644)
}

func (s *Store) GetAll() []*models.Post {
	s.mu.RLock()
	defer s.mu.RUnlock()

	posts := make([]*models.Post, 0, len(s.posts))
	for _, post := range s.posts {
		posts = append(posts, post)
	}
	return posts
}

func (s *Store) GetByID(id string) (*models.Post, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	post, ok := s.posts[id]
	return post, ok
}

func (s *Store) Create(post *models.Post) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	post.CreatedAt = time.Now()
	post.UpdatedAt = time.Now()
	s.posts[post.ID] = post
	return s.save()
}

func (s *Store) Update(id string, updates *models.UpdatePostRequest) (*models.Post, bool) {
	s.mu.Lock()
	defer s.mu.Unlock()

	post, ok := s.posts[id]
	if !ok {
		return nil, false
	}

	if updates.Title != "" {
		post.Title = updates.Title
	}
	if updates.Content != "" {
		post.Content = updates.Content
	}
	if updates.Author != "" {
		post.Author = updates.Author
	}
	post.UpdatedAt = time.Now()

	s.save()
	return post, true
}

func (s *Store) Delete(id string) bool {
	s.mu.Lock()
	defer s.mu.Unlock()

	_, ok := s.posts[id]
	if !ok {
		return false
	}

	delete(s.posts, id)
	s.save()
	return true
}

var GlobalStore = NewStore()
