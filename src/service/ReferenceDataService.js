import RestClient from "../framework/RestClient";
import _ from 'lodash';

class ReferenceDataService {
    static _processListResources(promise, resourceName) {
        return promise.then((responseObj) => responseObj["_embedded"][resourceName]);
    }

    static _getAllResources(resourceName) {
        return ReferenceDataService._processListResources(RestClient.getJSON(resourceName), resourceName);
    }

    static getAllAssessmentToolModes() {
        return ReferenceDataService._getAllResources("assessmentToolMode");
    }

    static getAssessmentTools(assessmentToolModeName) {
        return ReferenceDataService._processListResources(RestClient.getJSON("assessmentTool/search/byAssessmentToolMode/", {assessmentToolModeName: assessmentToolModeName}), "assessmentTool");
    }

    static getChecklists(assessmentToolName) {
        return ReferenceDataService._processListResources(RestClient.getJSON("checklist/search/byAssessmentTool/", {assessmentToolName: assessmentToolName}), "checklist");
    }

    static getAllStates() {
        return ReferenceDataService._getAllResources("state");
    }

    static getFacilityTypes() {
        return ReferenceDataService._getAllResources("facilityType");
    }

    static getAllAssessmentTypes() {
        return ReferenceDataService._getAllResources("assessmentType");
    }

    static getDistricts(stateName) {
        return ReferenceDataService._processListResources(RestClient.getJSON("district/search/byState/", {stateName: stateName}), "district");
    }

    static getFacilities(districtName, facilityTypeName) {
        if (_.isNil(facilityTypeName))
            return ReferenceDataService._processListResources(RestClient.getJSON("facility/search/byDistrict/", {districtName: districtName}), "facility");
        else
            return ReferenceDataService._processListResources(RestClient.getJSON("facility/search/byDistrictAndFacilityType/", {districtName: districtName, facilityTypeName: facilityTypeName}), "facility");
    }
}

export default ReferenceDataService;