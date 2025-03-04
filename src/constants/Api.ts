enum ApiType {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
  }
  
  enum NeedsBearer {
    TRUE = "true",
    FALSE = "false",
  }
  
  export const ApiDetails = {
    //Auth Api's
    login: ["auth/login", ApiType.POST, NeedsBearer.FALSE],
    refreshToken: ["auth/refresh", ApiType.POST, NeedsBearer.TRUE],
  
    //Customers Api's
    createCustomer: ["customers/createCustomer", ApiType.POST, NeedsBearer.TRUE],
    updateCustomerById: [
      "customers/updateCustomer",
      ApiType.PUT,
      NeedsBearer.TRUE,
    ],
    fetchCustomers: ["customers/getallcustomers", ApiType.GET, NeedsBearer.TRUE],
    fetchCustomerById: [
      "customers/getCustomerById?id=",
      ApiType.GET,
      NeedsBearer.TRUE,
    ],
  };
  