using vms from '../db/schema';

service vendorManagerService{

    entity Vendors as projection on vms.Vendors;

    @cds.autoexpose
    entity Contacts as projection on vms.Contacts;

    @cds.autoexpose
    entity Products as projection on vms.Products;

    @readonly
    entity Grades as projection on vms.M_Grades;

    @readonly
    entity Industries as projection on vms.M_Industries;

    @readonly
    entity SubIndustries as projection on vms.M_SubIndustries;

    @readonly
    entity Stages as projection on vms.M_Stages;

    @readonly
    entity CompanyList as SELECT DISTINCT companyname FROM Vendors WHERE isdel = false;

}