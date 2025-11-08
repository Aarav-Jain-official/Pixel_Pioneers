const API_BASE_URL = 'http://localhost:8000/api/v1/users';

class ApiService {
  async makeRequest(endpoint, authToken, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (response.status === 401) {
      throw new Error('UNAUTHORIZED');
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  // investments API methods
  async getinvestments(authToken) {
    return this.makeRequest('/investments', authToken);
  }

  async getinvestmentsSummary(authToken) {
    return this.makeRequest('/investments/summary', authToken);
  }

  async getInvestmentTypes(authToken) {
    return this.makeRequest('/investments/types', authToken);
  }

  async getInvestmentsByType(type, authToken) {
    return this.makeRequest(`/investments/type/${type}`, authToken);
  }

  async addInvestment(investmentData, authToken) {
    return this.makeRequest('/investments/investments', authToken, {
      method: 'POST',
      body: JSON.stringify(investmentData),
    });
  }

  async updateInvestment(investmentId, investmentData, authToken) {
    return this.makeRequest(`/investments/investments/${investmentId}`, authToken, {
      method: 'PUT',
      body: JSON.stringify(investmentData),
    });
  }

  async removeInvestment(investmentId, authToken) {
    return this.makeRequest(`/investments/investments/${investmentId}`, authToken, {
      method: 'DELETE',
    });
  }

  async getMarketSummary(authToken) {
    return this.makeRequest('/investments/market', authToken);
  }
}

export default new ApiService();
