// utils/auth.ts
// Authentication এবং Authorization helper functions

/**
 * Get token from localStorage
 */
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

/**
 * Get user info from localStorage
 */
export const getUser = (): any | null => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
  }
  return null;
};

/**
 * Get user role
 */
export const getUserRole = (): string | null => {
  const user = getUser();
  return user?.role || null;
};

/**
 * Check if user is admin
 */
export const isAdmin = (): boolean => {
  const role = getUserRole();
  return role?.toLowerCase() === 'admin';
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

/**
 * Logout user - clear localStorage and redirect
 */
export const logout = (redirectPath: string = '/auth'): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = redirectPath;
  }
};

/**
 * Get axios config with auth header
 */
export const getAuthConfig = () => {
  const token = getAuthToken();
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
};

/**
 * Redirect based on user role
 */
export const redirectByRole = (): string => {
  const role = getUserRole();
  
  if (role?.toLowerCase() === 'admin') {
    // return '/admin/Dashboard';
    return '/admin/MenuItems'
  } else {
    return '/auth';
  }
};


/**
 * Check if user has access to admin routes
 * Use this in admin pages to protect them
 */
export const requireAdmin = (redirectPath: string = '/auth'): boolean => {
  if (!isAuthenticated()) {
    if (typeof window !== 'undefined') {
      window.location.href = redirectPath;
    }
    return false;
  }
  
  if (!isAdmin()) {
    // User is authenticated but not admin - redirect to customer dashboard
    if (typeof window !== 'undefined') {
      window.location.href = '/customer/dashboard';
    }
    return false;
  }
  
  return true;
};