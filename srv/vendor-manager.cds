using vms from '../db/schema';

service vendorManagerService{

    entity Vendors as projection on vms.Vendors;

    @readonly
    entity Grades as projection on vms.M_Grades;

    @readonly
    entity Industries as projection on vms.M_Industries;

    @readonly
    entity SubIndustries as projection on vms.M_SubIndustries;

    @readonly
    entity Stages as projection on vms.M_Stages;

}