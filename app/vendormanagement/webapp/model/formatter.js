sap.ui.define([], function () {
    "use strict";
  
    return {
  
      formatStage : function(stateId){

        const Stages = this.getView().getModel('oModel').getProperty('/Stages');

        return Stages[stateId];

      },
      formatGrade : function(ID){

        const Grades = this.getView().getModel('oModel').getProperty('/Grades');

        return Grades[ID];

      },
      formatIndustry : function(ID){

        const Industries = this.getView().getModel('oModel').getProperty('/Industries');

        return Industries[ID];

      },
      formatSubIndustry : function(ID){

        const AllSubIndustries = this.getView().getModel('oModel').getProperty('/AllSubIndustries');

        return AllSubIndustries[ID];

      }

    };
  
  });