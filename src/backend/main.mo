import List "mo:core/List";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  public type Inquiry = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
    status : InquiryStatus;
  };

  public type InquiryStatus = {
    #new;
    #inProgress;
    #closed;
  };

  public type Response = {
    success : Bool;
    message : Text;
  };

  var inquiryCounter = 0;
  let inquiries = List.empty<Inquiry>();

  public shared ({ caller }) func submitInquiry(name : Text, email : Text, message : Text) : async Response {
    if (name.size() == 0 or email.size() == 0 or message.size() == 0) {
      return {
        success = false;
        message = "All fields are required.";
      };
    };

    let inquiry : Inquiry = {
      id = inquiryCounter;
      name;
      email;
      message;
      timestamp = 0;
      status = #new;
    };

    inquiries.add(inquiry);
    inquiryCounter += 1;

    {
      success = true;
      message = "Inquiry submitted successfully.";
    };
  };

  public shared ({ caller }) func updateInquiryStatus(inquiryId : Nat, newStatus : InquiryStatus) : async Response {
    let updatedInquiries = inquiries.map<Inquiry, Inquiry>(
      func(inquiry) {
        if (inquiry.id == inquiryId) {
          {
            inquiry with
            status = newStatus;
          };
        } else {
          inquiry;
        };
      }
    );

    let found = inquiries.any(
      func(inquiry) {
        inquiry.id == inquiryId;
      }
    );

    if (not found) {
      Runtime.trap("Inquiry not found");
    };

    inquiries.clear();
    inquiries.addAll(
      updatedInquiries.values()
    );

    {
      success = true;
      message = "Inquiry status updated.";
    };
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.toArray();
  };

  public query ({ caller }) func getInquiryById(inquiryId : Nat) : async Inquiry {
    switch (inquiries.toArray().find(func(inquiry) { inquiry.id == inquiryId })) {
      case (?inquiry) { inquiry };
      case (null) { Runtime.trap("Inquiry not found") };
    };
  };

  public query ({ caller }) func getInquiriesByStatus(status : InquiryStatus) : async [Inquiry] {
    inquiries.filter(func(inquiry) { inquiry.status == status }).toArray();
  };
};
