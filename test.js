'use strict';

var electron = require('electron');
var proc = require('child_process');
var filename = 'testpdfprint.pdf';
var child;
var sandbox='--no-sandbox'; //'--no-sandbox';
var logNet='--log-net-log=/home/kenmac/dev-ui/testElectron5/net-log'+new Date().getTime()
var enableLogging='--enable-logging';
var config={};
var exec = require('child_process').exec;


    // copy and paste a http headers into this variable. 
    config.url="http://localhost:4200/#/patient/cbec38f7-b8f7-4661-a295-68f1a82b26df/summary?activeReportFamily=2&timeframe=0&daysSelection=30&days=30&startDate=Tue%20Mar%2026%202019%2000:00:00%20GMT-0400%20(Eastern%20Daylight%20Time)&endDate=Wed%20Apr%2024%202019%2000:00:00%20GMT-0400%20(Eastern%20Daylight%20Time)";
    config.debug=false;  // this value if true doesn't close the visual window (the show will always be true)
    config.stod=0;
    config.documentId= "req.body.documentId"+new Date().toISOString();
    config.transactionId="trans_id" + new Date().getMilliseconds(); //this is the GUID from the ui-server
    // auth token put into login block (copy)
    //auth_token: {"userId":"1e46a995-c4b0-414a-9f01-1d2c3be22c54","uniqueId":"d56ca88f-a154-4bfa-814a-59eb91ad32e0","hash":"pW2GSSKEmAr3ggYv8lFh9DZ2m+iJtmJgrKiTUTlFs0c/biaoS7b837ALB7OZVg2CwmJtlbl/VSxmLgVimvrjsw==","timeToLive":21600}

    config.token={"userId":"1e46a995-c4b0-414a-9f01-1d2c3be22c54","uniqueId":"d56ca88f-a154-4bfa-814a-59eb91ad32e0","hash":"pW2GSSKEmAr3ggYv8lFh9DZ2m+iJtmJgrKiTUTlFs0c/biaoS7b837ALB7OZVg2CwmJtlbl/VSxmLgVimvrjsw==","timeToLive":21600}
    // outer wrapper of authtoken copy paste into here
    config.session = {"session": { "responseCode": 1, "token": { "userId": "1e46a995-c4b0-414a-9f01-1d2c3be22c54", "uniqueId": "d56ca88f-a154-4bfa-814a-59eb91ad32e0", "hash": "pW2GSSKEmAr3ggYv8lFh9DZ2m+iJtmJgrKiTUTlFs0c/biaoS7b837ALB7OZVg2CwmJtlbl/VSxmLgVimvrjsw==", "timeToLive": 21600 }, "userPermissions": ["Toggle_F2942_NightOne", "ViewCustomUsage", "ManageCustomFields", "AddPatient", "ManageCareProgram", "ViewCareProgram", "ViewUserSleepReports", "Toggle_US16865_NewTrilogyWorker", "ManagePatientRules", "Toggle_F678_EnableSubOrgInheritsFromTransformation", "ViewAdminTasks", "Toggle_F4575_CIS_Get_Accessories", "AssignDevice", "SearchPatients", "TemporaryPatientAccess", "ManageOrganizationSettings", "Toggle_F2261", "Toggle_F2535_SDM_PAMS_As_SubCat", "Toggle_F4327_PatientV2_KES_Producer", "Toggle_F2286_Trilogy_waveform", "Toggle_F2320_Payers_Migration", "EditUser", "Toggle_F2925_CustomizeCareProgram", "ViewCompanyPremiumFeatures", "Toggle_Japan-Standard", "ManagePayers", "Toggle_F2320_OrgMergeComponent", "Toggle_Trilogy_Reprocess", "ManageTherapyReportByBlowerTime", "ViewPayers", "ConfigureOrg", "ManageCareTeamLocationAutoAssign", "Toggle_US14576_OLH_2WayClienCertificateAuthentication", "SearchOrgs", "ViewUserFirstLastName", "CustomPatientListView", "ManageReportTemplatesTrilogy", "Toggle_F2320_TherapyTemplates_Migration", "ViewOrganizationSettings", "ResetUsersPasswords", "ViewUser", "Toggle_F2320_ReminderGroups_Migration", "CreatePrescription", "Toggle_F929_EnableTopOrgCountryLinkageTransformation", "ViewTherapyData", "SignBusinessAgreements", "ViewTasks", "Toggle_F405_OrgMergeSplit", "CreateAppInvitation", "Toggle_US18886_Move_PamsAutoAssign_To_AuthEntities", "Toggle_F2257", "Toggle_TrilogySummaryReport", "CreatePatientManualTask", "Toggle_US16810_TrilogyDataHandingLegacy", "ManageTherapyReportTemplates", "UpdateSearchOrgs", "SelectAdminLandingPage", "Toggle_F2513_ExtendedPatientSearch_Migration", "Toggle_F2745", "ViewEntityInfo", "ChangeMyPassword", "Toggle_F2804_US26595", "Toggle_F2513_NhsNumberCategoryPropagation", "ManagePatientViewTemplates", "Toggle_TextSearchContains", "Toggle_US24332_DoNotUseVaultForKafka", "Toggle_F886_careteam", "ManageTrilogyCareProgram", "ViewCompanyInfo", "ViewReminders", "UpdateSearchUsers", "UploadTherapyData", "FeatureEnablement", "Toggle_F4359_ExternalServiceRefactor", "Toggle_F2320_CustomFields_Migration", "Toggle_F2928_CpDurationNextCp", "Toggle_F2320_AvailableAccessories_Migration", "Toggle_TrilogyWithoutEvo_RxChangedRule", "Toggle_F888_Password_Reset", "ManageSDCardTrilogy", "ViewCompanyPremiumFeatureHistory", "ViewOrganizationTypes", "ManageCompany", "ManagePatientOrg", "AddUser", "Toggle_F2924", "ViewPrescription", "SelectClinicalLandingPage", "Toggle_F2665_EnablePatientCareTeamGroupTransformation", "DeleteTherapyData", "ManageTherapyReportTemplatesForTopOrg", "ManageEquipmentTrilogy", "AccessSapphire", "ManageRulesTrilogy", "Toggle_VentRawDataPersist", "EditPatient", "ManageSettings", "SearchUsers", "ViewTrilogyCareProgram", "ManageEquipment", "ManageRules", "Toggle_F2320_EntitySettingsTransformation", "ViewTrilogyReports", "ViewUserContactInfo", "ManageCustomUsage", "ViewCustomFields", "Toggle_F4590_OnePageReportTemplate", "ManageReminders", "ViewPatient", "ViewEquipment", "ViewTherapyReportTemplates", "Toggle_US20436_EnableTransformation", "ManageExternalAuthorizations", "ViewCompany"], "userLogin": "chimayclin", "userFirstName": "Chimay", "userLastName": "Clinician", "userEmailAddress": null, "userTopOrgId": "81844546-4aaa-4fb2-8eb9-05ca040bd2f6", "passwordMinLength": 8 } }
    config.language="en";
    config.locale="en-us";
    config.parameters={"executedDate":"2019-08-22T17:18:26.874Z","patientUuid":"cbec38f7-b8f7-4661-a295-68f1a82b26df","orgId":"81844546-4aaa-4fb2-8eb9-05ca040bd2f6","userName":"Chimay Clinician","context":"device-summary","cache":{"cacheName":"REPORT-EXECUTOR-CACHE","cache":{"keys":["proxy/SAPPHIREGATEWAY-V1-SERVER/devicesummary/therapy-summary-stats/cbec38f7-b8f7-4661-a295-68f1a82b26df?start=2019-03-26&end=2019-04-24&serialNumbers=TV1190711A1","proxy/SAPPHIREGATEWAY-V1-SERVER/devicesummary/daily-device-usage/cbec38f7-b8f7-4661-a295-68f1a82b26df?start=2019-03-26&end=2019-04-24","proxy/SAPPHIREGATEWAY-V1-SERVER/devicesummary/daily-device-usage/cbec38f7-b8f7-4661-a295-68f1a82b26df?start=2019-03-26&end=2019-04-24","proxy/SAPPHIREGATEWAY-V1-SERVER/devicesummary/therapy-summary-stats/cbec38f7-b8f7-4661-a295-68f1a82b26df?start=2019-03-26&end=2019-04-24&serialNumbers=TV1190711A1","proxy/SAPPHIREGATEWAY-V1-SERVER/vent/therapies/patients/cbec38f7-b8f7-4661-a295-68f1a82b26df?start=2019-03-26&end=2019-04-24","proxy/SAPPHIREGATEWAY-V1-SERVER/vent/therapies/patients/cbec38f7-b8f7-4661-a295-68f1a82b26df?start=2019-03-26&end=2019-04-24","proxy/SAPPHIREGATEWAY-V1-SERVER/vent/therapies/patients/cbec38f7-b8f7-4661-a295-68f1a82b26df?start=2019-03-26&end=2019-04-24&stod=0","proxy/SAPPHIREGATEWAY-V1-SERVER/vent/therapies/patients/cbec38f7-b8f7-4661-a295-68f1a82b26df?start=2019-03-26&end=2019-04-24&stod=0","proxy/SAPPHIREGATEWAY-V1-SERVER/devicesummary/therapy-summary-stats/cbec38f7-b8f7-4661-a295-68f1a82b26df?start=2019-03-26&end=2019-04-24&serialNumbers=TV1190711A1","proxy/SAPPHIREGATEWAY-V1-SERVER/devicesummary/daily-device-usage/cbec38f7-b8f7-4661-a295-68f1a82b26df?start=2019-03-26&end=2019-04-24","proxy/SAPPHIREGATEWAY-V1-SERVER/devicesummary/daily-device-usage/cbec38f7-b8f7-4661-a295-68f1a82b26df?start=2019-03-26&end=2019-04-24","proxy/SAPPHIREGATEWAY-V1-SERVER/devicesummary/therapy-summary-stats/cbec38f7-b8f7-4661-a295-68f1a82b26df?start=2019-03-26&end=2019-04-24&serialNumbers=TV1190711A1"]}}        };
    config.save=true;  //always upload test the uploader to saved documents
    // had to remove the escaped body codes backslash data still works this way, so there is basically no CACHE
    config.cache={"name":"REPORT-EXECUTOR-CACHE","data":{"proxy/SAPPHIREGATEWAY-V1-SERVER/devicesummary/therapy-summary-stats/cbec38f7-b8f71-4661-a295-68f1a82b26df?start=2019-03-26&end=2019-04-24&serialNumbers=TV1190711A1":[200, "OK"]}}; 

	console.log("=====   before child = proc.spawn(");
    //Start electron child process.  Pass in config as string and open IPC channel for sending messages
    child = proc.spawn(
        electron,
        [sandbox, logNet, enableLogging, 'main.js', filename],
            {stdio: [null, null, null, 'ipc']}
     );

    console.log("=====   main.js stdout after before ps 2 function =============== \n");


	// exec('ps -ef', function(err, stdout, stderr) {
	//   // stdout is a string containing the output of the command.
	//   console.log("AFTER stdout="+stdout);
	// });

	// child.on('logs', function(logs) {
    //     console.log('child process logs' +  logs);
	// });
	
	// child.on('error', function(error) {
    //     console.log('child process error' +  error);
	// });


	child.on('message', function(message) {
		//console.log("node test child.on( message received from main.js process...");

        if(message === 'DONE') {
			console.log("test.js message is equal to DONE!!!!!")
        }
        else if(message === 'CONFIG') {
			console.log("test.js message is equal to DONE!!!!!")
            child.send(config);
		}
		else if(!message.includes("LOGS")) {
			console.log("simple message is: = " + message);
		}
		else {
			console.log("message here:" + message);
		}
    });

	// console.log("== testCallToMain: after message  function 3");
	// onEvent('logs', child);
    // onEvent('errors', child);
    onEvent('close', child);
	onEvent('exit', child);

	function onEvent (event, child) {
		child.on(event, data => console.log(`PID::${child.pid} EVENT::${event.toUpperCase()} DATA::${data}`));
	}

	console.log("== test.jsCallToMain: bottom of page");