
// global variable for memory user
let currentUser = null;

// Referințe globale la secțiuni și linkuri, pentru ușurință
let navHome, navRegister, navBlog, navNewEntry, navAbout;
let sectionHome, sectionRegister, sectionBlog, sectionNewpost, sectionAbout;

/* main function for initialization */
function init() {
  // 1. for reference to navigation link
  navHome     = document.getElementById('nav-home');
  navRegister = document.getElementById('nav-register');
  navBlog     = document.getElementById('nav-blog');
  navNewEntry = document.getElementById('nav-new-entry');
  navAbout    = document.getElementById('nav-about');

  // 2. for reference to section
  sectionHome     = document.getElementById('home-section');
  sectionRegister = document.getElementById('register-section');
  sectionBlog     = document.getElementById('blog-section');
  sectionNewpost  = document.getElementById('newpost-section');
  sectionAbout    = document.getElementById('about-section');

  // 3. Leg evenimente de click pentru navigare
  navHome.addEventListener('click', (e) => { e.preventDefault(); showSection('home'); });
  navRegister.addEventListener('click', (e) => { e.preventDefault(); showSection('register'); });
  navBlog.addEventListener('click', (e) => { e.preventDefault(); showSection('blog'); });
  navNewEntry.addEventListener('click', (e) => { e.preventDefault(); showSection('newpost'); });
  navAbout.addEventListener('click', (e) => { e.preventDefault(); showSection('about'); });

  // 4. Formulares and butttons
  const homeForm     = document.getElementById('home-form');
  const registerForm = document.getElementById('register-form');
  const newPostForm  = document.getElementById('newpost-form');
  const loadPostsBtn = document.getElementById('load-posts-btn');

  homeForm.addEventListener('submit', handleLogin);
  registerForm.addEventListener('submit', handleRegister);
  newPostForm.addEventListener('submit', handleNewPost);

  if (loadPostsBtn) {
    loadPostsBtn.addEventListener('click', loadPosts);
  }

  // 5. show section Home (Login)
  showSection('home');

  // dont show links Blog și New Entry 
  navBlog.style.display = 'none';
  navNewEntry.style.display = 'none';
}

/* 
   Funcția showSection(sectionName) its for showing only function which i wanna see
*/
function showSection(sectionName) {
  // Ascund mai întâi toate secțiunile
  sectionHome.style.display = 'none';
  sectionRegister.style.display = 'none';
  sectionBlog.style.display = 'none';
  sectionNewpost.style.display = 'none';
  sectionAbout.style.display = 'none';

  // displaying only requested 
  switch(sectionName) {
    case 'home':
      sectionHome.style.display = 'block';
      break;
    case 'register':
      sectionRegister.style.display = 'block';
      break;
    case 'blog':
      sectionBlog.style.display = 'block';
      break;
    case 'newpost':
      sectionNewpost.style.display = 'block';
      break;
    case 'about':
      sectionAbout.style.display = 'block';
      break;
    default:
      // fallback
      sectionHome.style.display = 'block';
  }
}

/* 
   Login: dacă user = "user" și pass = "12345", considerăm login reușit.
   (În realitate, ai face un fetch POST la server)
*/
function handleLogin(event) {
  event.preventDefault();
  const form = event.target;
  const username = form.username.value.trim();
  const password = form.password.value.trim();

  // clear errors
  document.getElementById('home-error').textContent = '';

  if (username === 'user' && password === '12345') {
    // Login succsesfull
    currentUser = username;
    alert('Login successful!');

    // hiding(ascund) link Home și Register
    navHome.style.display = 'none';
    navRegister.style.display = 'none';

    // show link Blog și New Entry
    navBlog.style.display = 'inline-block';
    navNewEntry.style.display = 'inline-block';

    // pass direct to section Blog
    showSection('blog');
  } else {
    // for eror
    document.getElementById('home-error').textContent = 'Invalid credentials!';
  }
}

/* Register (exemplu simplu, simulăm un PUT la server) */
function handleRegister(event) {
  event.preventDefault();

  const form = event.target;
  const nick      = form.nick.value.trim();
  const email     = form.email.value.trim();
  const name      = form.name.value.trim();
  const surname   = form.surname.value.trim();
  const pass1     = form['reg-password'].value.trim();
  const pass2     = form['password-check'].value.trim();

  // Golim eventuala eroare anterioară
  document.getElementById('register-error').textContent = '';

  // for validating password
  if (pass1 !== pass2) {
    document.getElementById('register-error').textContent = 'Passwords do not match!';
    return;
  }

  // Simulăm un request PUT
  
  alert(`User ${nick} registered successfully.`);

  // Poți alege să mergi la Home
  showSection('home');
}

/* New Blog Post */
function handleNewPost(event) {
  event.preventDefault();

  const form = event.target;
  const title   = form.title.value.trim();
  const date    = form.date.value;
  const comment = form.comment.value.trim();

  document.getElementById('newpost-error').textContent = '';

  if (!currentUser) {
    document.getElementById('newpost-error').textContent = 'You must be logged in first.';
    return;
  }

  // Simulăm un request PUT
  
  alert(`New blog post created:\nTitle: ${title}\nDate: ${date}\nComment: ${comment}`);

  // După "creare", mergi la Blog
  showSection('blog');
}

/* Load Posts - exemplu GET la server pentru blog-ul userului curent */
function loadPosts() {
  if (!currentUser) {
    document.getElementById('blog-error').textContent = 'Please log in first.';
    return;
  }
  // clear eror
  document.getElementById('blog-error').textContent = '';

  const blogList = document.getElementById('blog-list');
  blogList.innerHTML = ''; // golim lista

  // simulation date from server
  const fakePosts = [
    { title: 'My first post', date: '2025-01-20', comment: 'Hello world!' },
    { title: 'A second post', date: '2025-02-10', comment: 'Another entry...' }
  ];

  fakePosts.forEach(post => {
    const li = document.createElement('li');
    li.textContent = `${post.title} (${post.date}): ${post.comment}`;
    blogList.appendChild(li);
  });
}


document.addEventListener('DOMContentLoaded', init);


//for apel to fetch Post from server
function registerUser(nick, email, password) {
    // Cream obiectul cu date
    const payload = {
      nick: nick,
      email: email,
      password: password
    };
  
    // Apelează fetch cu metoda PUT (conform cerințelor) sau POST, 
    // depinde ce a specificat serverul
    fetch('http://labtelema.ujaen.es:8083/user', {
      method: 'PUT', // sau 'POST', dacă așa cere serverul
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      
      if (!response.ok) {
        
        throw new Error(`Server error: ${response.status}`);
      }
      
      return response.json(); 
    })
    .then(data => {
      
      console.log('Register success:', data);
      alert('User registered successfully!');
    })
    .catch(error => {
      
      console.error('Register error:', error);
      alert(`Registration failed: ${error.message}`);
    });
  }
  