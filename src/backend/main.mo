import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Principal "mo:core/Principal";



actor {
  public type Product = {
    id : Text;
    name : Text;
    variant : Text;
    price : Nat;
    description : Text;
    benefits : [Text];
    imageUrl : Text;
    inStock : Bool;
  };

  public type CartItem = {
    productId : Text;
    quantity : Nat;
    addedAt : Int;
  };

  public type OrderStatus = {
    #pending;
    #processing;
    #shipped;
    #delivered;
    #cancelled;
  };

  public type Order = {
    id : Text;
    items : [CartItem];
    customerName : Text;
    customerEmail : Text;
    shippingAddress : Text;
    totalAmount : Nat;
    status : OrderStatus;
    createdAt : Int;
    updatedAt : Int;
  };

  public type OrderResponse = {
    success : Bool;
    message : Text;
    orderId : ?Text;
  };

  public type ProductResponse = {
    success : Bool;
    product : ?Product;
  };

  public type OrderStatusResponse = {
    success : Bool;
    message : Text;
    order : ?Order;
  };

  public type ProductListResponse = {
    success : Bool;
    products : [Product];
  };

  public type OrderListResponse = {
    success : Bool;
    orders : [Order];
  };

  public type ContactSubmission = {
    id : Text;
    customerName : Text;
    customerEmail : Text;
    address : Text;
    message : ?Text;
    submittedAt : Int;
  };

  public type ContactFormResponse = {
    success : Bool;
    message : Text;
    submissionId : ?Text;
  };

  public type ContactSubmissionListResponse = {
    success : Bool;
    submissions : [ContactSubmission];
  };

  let products = Map.empty<Text, Product>();
  let orders = Map.empty<Text, Order>();
  let contactSubmissions = Map.empty<Text, ContactSubmission>();
  var nextOrderId = 1000;
  var nextContactSubmissionId = 1;

  public shared ({ caller }) func addProduct(
    id : Text,
    name : Text,
    variant : Text,
    price : Nat,
    description : Text,
    benefits : [Text],
    imageUrl : Text,
    inStock : Bool,
  ) : async ProductResponse {
    let product : Product = {
      id;
      name;
      variant;
      price;
      description;
      benefits;
      imageUrl;
      inStock;
    };
    products.add(id, product);
    {
      success = true;
      product = ?product;
    };
  };

  public query ({ caller }) func getProducts() : async ProductListResponse {
    if (products.isEmpty()) {
      {
        success = false;
        products = [];
      };
    } else {
      {
        success = true;
        products = products.values().toArray();
      };
    };
  };

  public query ({ caller }) func getProductById(productId : Text) : async ProductResponse {
    switch (products.get(productId)) {
      case (?product) {
        {
          success = true;
          product = ?product;
        };
      };
      case (null) {
        {
          success = false;
          product = null;
        };
      };
    };
  };

  public shared ({ caller }) func submitOrder(
    items : [CartItem],
    customerName : Text,
    customerEmail : Text,
    shippingAddress : Text,
  ) : async OrderResponse {
    if (items.size() == 0) {
      return {
        success = false;
        message = "Order must contain at least one item.";
        orderId = null;
      };
    };

    let totalAmount = items.foldLeft(
      0,
      func(acc, item) {
        switch (products.get(item.productId)) {
          case (?product) {
            acc + (product.price * item.quantity);
          };
          case (null) {
            acc;
          };
        };
      },
    );

    if (totalAmount == 0) {
      return {
        success = false;
        message = "Invalid order items or products not found.";
        orderId = null;
      };
    };

    let orderId = "VX-" # nextOrderId.toText();
    let now = Time.now();

    let order : Order = {
      id = orderId;
      items;
      customerName;
      customerEmail;
      shippingAddress;
      totalAmount;
      status = #pending;
      createdAt = now;
      updatedAt = now;
    };

    orders.add(orderId, order);
    nextOrderId += 1;

    {
      success = true;
      message = "Order submitted successfully.";
      orderId = ?orderId;
    };
  };

  public query ({ caller }) func getOrderById(orderId : Text) : async OrderStatusResponse {
    switch (orders.get(orderId)) {
      case (?order) {
        {
          success = true;
          message = "Order found";
          order = ?order;
        };
      };
      case (null) {
        {
          success = false;
          message = "Order not found";
          order = null;
        };
      };
    };
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Text, newStatus : OrderStatus) : async OrderStatusResponse {
    switch (orders.get(orderId)) {
      case (?order) {
        let updatedOrder = {
          order with
          status = newStatus;
          updatedAt = Time.now();
        };
        orders.add(orderId, updatedOrder);
        {
          success = true;
          message = "Order status updated successfully";
          order = ?updatedOrder;
        };
      };
      case (null) {
        {
          success = false;
          message = "Order not found";
          order = null;
        };
      };
    };
  };

  public query ({ caller }) func getOrdersByStatus(status : OrderStatus) : async OrderListResponse {
    let filteredOrders = orders.values().filter(func(order) { order.status == status });
    let orderArray = filteredOrders.toArray();

    if (orderArray.size() == 0) {
      {
        success = false;
        orders = [];
      };
    } else {
      {
        success = true;
        orders = orderArray;
      };
    };
  };

  // Contact Form Features

  public shared ({ caller }) func submitContactForm(
    customerName : Text,
    customerEmail : Text,
    address : Text,
    message : ?Text,
  ) : async ContactFormResponse {
    let submissionId = "CF-" # nextContactSubmissionId.toText();
    let now = Time.now();

    let submission : ContactSubmission = {
      id = submissionId;
      customerName;
      customerEmail;
      address;
      message;
      submittedAt = now;
    };

    contactSubmissions.add(submissionId, submission);
    nextContactSubmissionId += 1;

    {
      success = true;
      message = "Contact form submitted successfully.";
      submissionId = ?submissionId;
    };
  };

  public query ({ caller }) func getAllContactSubmissions() : async ContactSubmissionListResponse {
    let allSubmissions = contactSubmissions.values().toArray();

    if (allSubmissions.size() == 0) {
      {
        success = false;
        submissions = [];
      };
    } else {
      let sortedSubmissions = allSubmissions.sort(
        func(a, b) { Int.compare(b.submittedAt, a.submittedAt) },
      );
      {
        success = true;
        submissions = sortedSubmissions;
      };
    };
  };
};
