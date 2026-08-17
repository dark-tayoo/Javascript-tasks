// ==========================================
// 1. GITHUB SERVICE MODULE
// ==========================================
const GitHubService = (() => {
  const BASE_URL = 'https://api.github.com/users';

  // Transform the response into a smaller user model
  const transformUserData = (data) => ({
    avatar: data.avatar_url,
    username: data.login,
    name: data.name || data.login,
    bio: data.bio || 'This user has no bio.',
    repos: data.public_repos,
    followers: data.followers,
    following: data.following,
    profileUrl: data.html_url
  });

  return {
    async fetchUser(username) {
      // Validate the username before requesting
      if (!username || username.trim() === '') {
        throw new Error('VALIDATION_ERROR');
      }

      try {
        const response = await fetch(`${BASE_URL}/${encodeURIComponent(username.trim())}`);
        
        // Check response.ok and handle specific HTTP statuses
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('NOT_FOUND'); // Handle not found separately
          }
          throw new Error('NETWORK_ERROR'); // Other server errors
        }

        const data = await response.json();
        return transformUserData(data); // Return transformed model

      } catch (error) {
        // Distinguish between our custom errors and actual network fetch failures
        if (['VALIDATION_ERROR', 'NOT_FOUND'].includes(error.message)) {
          throw error;
        }
        throw new Error('NETWORK_ERROR');
      }
    }
  };
})();

const App = (() => {
  // DOM Elements
  const input = document.getElementById('username-input');
  const searchBtn = document.getElementById('search-btn');
  const retryBtn = document.getElementById('retry-btn');
  
  const loadingState = document.getElementById('state-loading');
  const errorState = document.getElementById('state-error');
  const emptyState = document.getElementById('state-empty');
   const resultState = document.getElementById('state-result');
  
  let lastSearchedUsername = '';
  let hasValidPreviousResult = false;

  // Render user details
  const renderUser = (user) => {
    resultState.innerHTML = `
      <img src="${user.avatar}" alt="${user.username}'s avatar" class="avatar" />
      <div class="user-info">
        <h2>${user.name} <span>(@${user.username})</span></h2>
        <p class="bio">${user.bio}</p>
        <div class="stats">
          <span><strong>${user.repos}</strong> Repos</span>
          <span><strong>${user.followers}</strong> Followers</span>
          <span><strong>${user.following}</strong> Following</span>
        </div>
        <a href="${user.profileUrl}" target="_blank" class="profile-link">View Profile</a>
      </div>
    `;
    resultState.classList.remove('hidden');
    hasValidPreviousResult = true;
  };

  const handleSearch = async (usernameToSearch) => {
    if (!usernameToSearch.trim()) return; // Basic UI validation
    
    lastSearchedUsername = usernameToSearch;

    // Set loading state before the request
    loadingState.classList.remove('hidden');
    errorState.classList.add('hidden');
    emptyState.classList.add('hidden');
    
    // Note: We deliberately do NOT hide `resultState` here.
    // This satisfies: "Keep the previous valid result where appropriate" while loading.

    try {
      const user = await GitHubService.fetchUser(usernameToSearch);
      
      // Success State
      loadingState.classList.add('hidden');
      renderUser(user);

    } catch (error) {
      // Remove loading state on failure
      loadingState.classList.add('hidden');
      
      if (error.message === 'NOT_FOUND') {
        // If it's a hard 404, the previous user data is no longer relevant to this search
        resultState.classList.add('hidden');
        hasValidPreviousResult = false;
        emptyState.classList.remove('hidden');
      } 
      else if (error.message === 'NETWORK_ERROR') {
        // Handle network failure. If we have a previous result, keep it visible!
        errorState.classList.remove('hidden');
      }
    }
  };

  // Event Listeners
  searchBtn.addEventListener('click', () => handleSearch(input.value));
  
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch(input.value);
  });
  
  // Add retry using the last attempted username
  retryBtn.addEventListener('click', () => handleSearch(lastSearchedUsername));

})();