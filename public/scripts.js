// public/scripts.js

async function createUser() {
  try {
    const username = document.getElementById('username').value;
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    });
    const user = await response.json();
    console.log('User created:', user);
    
    // Display user information
    document.getElementById('user-info-text').textContent = `Username: ${user.username}`;
    document.getElementById('user-info').style.display = 'block';
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

async function createPost() {
  try {
    const content = document.getElementById('post-content').value;
    const image = document.getElementById('post-image').files[0];

    // Display post content preview
    document.getElementById('post-content-preview').textContent = content;

    // Display post image preview
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      document.getElementById('post-image-preview').src = imageUrl;
      document.getElementById('post-image-preview').style.display = 'block';
    }

    // Display post preview
    document.getElementById('post-preview').style.display = 'block';
  } catch (error) {
    console.error('Error creating post:', error);
  }
}

async function loadPosts() {
  try {
    const response = await fetch('/api/posts');
    const posts = await response.json();
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `
        <p>${post.content}</p>
        ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post Image">` : ''}
      `;
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error('Error loading posts:', error);
  }
}

// Event listener to load posts when the DOM content is loaded
document.addEventListener('DOMContentLoaded', loadPosts);
