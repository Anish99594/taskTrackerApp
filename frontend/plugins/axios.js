export default function ({ $axios }) {
    // Set JWT token in request headers
    $axios.onRequest(config => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });

    $axios.onError(error => {
        if (error.response.status === 401) {
          // Redirect to login page or handle unauthorized access
          console.error('Unauthorized access');
        }
        return Promise.reject(error);
      });
  }