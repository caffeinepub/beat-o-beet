import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Time "mo:core/Time";

module {
  type Product = {
    id : Text;
    name : Text;
    variant : Text;
    price : Nat;
    description : Text;
    benefits : [Text];
    imageUrl : Text;
    inStock : Bool;
  };

  type CartItem = {
    productId : Text;
    quantity : Nat;
    addedAt : Int;
  };

  type OrderStatus = {
    #pending;
    #processing;
    #shipped;
    #delivered;
    #cancelled;
  };

  type Order = {
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

  type ContactSubmission = {
    id : Text;
    customerName : Text;
    customerEmail : Text;
    address : Text;
    message : ?Text;
    submittedAt : Int;
  };

  type OldActor = {
    products : Map.Map<Text, Product>;
    orders : Map.Map<Text, Order>;
    contactSubmissions : Map.Map<Text, ContactSubmission>;
    nextOrderId : Nat;
    nextContactSubmissionId : Nat;
  };

  type NewActor = OldActor;

  public func run(old : OldActor) : NewActor {
    old;
  };
};
