const form = document.querySelector('.form');
const username = document.querySelector('#username');
const userPassword = document.querySelector('#password');
const hidePassword = document.querySelector('#togglePassword');
const modal = document.getElementById('createUserModal');
const createUserBtn = document.getElementById('createUserBtn');
const cancelCreateUserBtn = document.getElementById('cancelCreateUserBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = username.value;
  const password = userPassword.value;

  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, password })
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem('name', name);
      window.location.href = 'chat.html';
    } else {
      if (data.message === 'User not found') {
        modal.style.display = 'block';
      } else {
        alert(data.message || 'Invalid user name or password');
      }
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred');
  }
});

createUserBtn.addEventListener('click', async () => {
  const name = username.value;
  const password = userPassword.value;

  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, password })
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem('name', name);
      window.location.href = 'chat.html';
    } else {
      alert(data.message || 'Failed to create user');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while creating the user');
  }

  modal.style.display = 'none';
});

window.addEventListener('click', () => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

hidePassword.addEventListener('click', () => {
  if (userPassword.type === 'password') {
    userPassword.type = 'text';
  } else {
    userPassword.type = 'password';
  }
});
