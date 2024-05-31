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

    companyname    : String(100);
    phone          : String(10);
    grade          : Composition of one M_Grades;
    stage          : Composition of one M_Stages;
    indusrty       : Composition of one M_Industries;
    subindusrty    : Composition of one M_SubIndustries;
    code           : String(10);

    // Vendor Address Details

    issbasame      : Boolean; // Is Shiping and billing addresses same ?

    billingAddress : String(500);
    bilingcity     : String(50);
    billingstate   : String(100);
    billingzip     : String(10);
    billingcountry : String(100);
    shipingAddress : String(500);
    shipingcity    : String(50);
    shipingstate   : String(100);
    shipingzip     : String(10);
    shipingcountry : String(100);

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
    mid   : Int16;
    text  : String(100);
    seqid : Int16;
    subindusrty : Composition of many M_SubIndustries on subindusrty.indusrty = $self;
}

// Sub Industries Master Data
entity M_SubIndustries : cuid, managed {
    mid   : Int16;
    text  : String(100);
    seqid : Int16;
    indusrty : Association to M_Industries;
}
