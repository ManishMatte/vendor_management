namespace vms;

using {
    cuid,
    managed
} from '@sap/cds/common';

extend managed {
    isdel : Boolean default false;
}

// Vendors Data
entity Vendors : cuid, managed {

    //Vendor Basic Details

    companyname     : String(100);
    phone           : String(10);
    email           : String(100);
    grade           : Composition of one T_Grades;
    stage           : Composition of one T_Stages;
    industry        : Composition of one T_Industries;
    subindustry     : Composition of one T_SubIndustries;
    contacts        : Composition of many Contacts
                          on contacts.vendor = $self;
    products        : Composition of many Products
                          on products.vendor = $self;
    code            : String(10);

    // Vendor Address Details

    issbasame       : Boolean; // Is Shiping and billing addresses same ?

    billingAddress  : String(500);
    bilingcity      : String(50);
    billingstate    : String(100);
    billingzip      : String(10);
    billingcountry  : String(100);
    shippingAddress : String(500);
    shippingcity    : String(50);
    shippingstate   : String(100);
    shippingzip     : String(10);
    shippingcountry : String(100);

}

//Products data

entity Products : cuid, managed {
    name     : String(100);
    image    : LargeString;
    family   : String(100);
    code     : String(100);
    currency : String(100);
    price    : String(100);
    vendor   : Association to Vendors;
}

// Contacts data

entity Contacts : cuid, managed {

    name   : String(100);
    title  : String(100);
    email  : String(200);
    phone  : String(50);
    vendor : Association to one Vendors;

}

// Grades Transactional data
entity T_Grades : cuid, managed {
    mid : Int16;
}

//Stages Transactional Data
entity T_Stages : cuid, managed {
    mid : Int16;
}

// Industries Transactional data
entity T_Industries : cuid, managed {
    mid : Int16;
}

// Sub Industries Transactional Data
entity T_SubIndustries : cuid, managed {
    mid : Int16;
}


// Grades Master data
entity M_Grades : cuid, managed {
    mid   : Int16;
    text  : String(100);
    seqid : Int16;
}

//Stages Master Data
entity M_Stages : cuid, managed {
    mid   : Int16;
    text  : String(100);
    seqid : Int16;
}

// Industries Matser data
entity M_Industries : cuid, managed {
    mid         : Int16;
    text        : String(100);
    seqid       : Int16;
    subindustry : Composition of many M_SubIndustries
                      on subindustry.industry = $self;
}

// Sub Industries Master Data
entity M_SubIndustries : cuid, managed {
    mid      : Int16;
    text     : String(100);
    seqid    : Int16;
    industry : Association to M_Industries;
}
