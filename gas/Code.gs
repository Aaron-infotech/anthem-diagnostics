/**
 * ==============================================================================
 * ANTHEM DIAGNOSTICS - MULTI-TAB GOOGLE APPS SCRIPT BACKEND
 * ==============================================================================
 * Automatically manages 3 SEPARATE TABS in Google Sheets:
 * 1. "Job Applications"  - Recruiter Portal (Resumes saved in Google Drive)
 * 2. "Brochure Enquiries" - Product Brochure & Price Quote Requests
 * 3. "Contact Messages"   - General Inquiries from Contact Us page
 * 
 * NO PHP or MySQL required!
 * ==============================================================================
 */

// CONFIGURATION CONSTANTS
const SPREADSHEET_NAME = "Anthem Diagnostics Master Database";
const TAB_JOB_APPLICATIONS = "Job Applications";
const TAB_BROCHURE_ENQUIRIES = "Brochure Enquiries";
const TAB_CONTACT_MESSAGES = "Contact Messages";
const DRIVE_FOLDER_NAME = "Anthem Job Resumes";

/**
 * Handle POST Requests from React Frontend
 */
function doPost(e) {
  try {
    const contents = JSON.parse(e.postData.contents);
    const action = contents.action || "submit_application";

    if (action === "submit_application") {
      const result = processJobApplication(contents);
      return createJsonResponse({ status: "success", data: result });
    }

    if (action === "submit_brochure" || action === "submit_enquiry") {
      const result = processBrochureRequest(contents);
      return createJsonResponse({ status: "success", data: result });
    }

    if (action === "submit_contact") {
      const result = processContactMessage(contents);
      return createJsonResponse({ status: "success", data: result });
    }

    if (action === "update_status") {
      const result = updateApplicationStatus(contents.id, contents.status);
      return createJsonResponse({ status: "success", data: result });
    }

    if (action === "delete_record" || action === "delete_row") {
      const result = deleteRecordFromSheet(contents.sheetName, contents.idValue);
      return createJsonResponse({ status: "success", data: result });
    }

    return createJsonResponse({ status: "error", message: "Unknown action" });
  } catch (error) {
    return createJsonResponse({ status: "error", message: error.toString() });
  }
}


/**
 * Handle GET Requests for Dashboard Views (Returns All 3 Tabs)
 */
function doGet(e) {
  try {
    const ss = getOrCreateSpreadsheet();
    const applications = readSheetData(ss.getSheetByName(TAB_JOB_APPLICATIONS)).slice().reverse();
    const brochureEnquiries = readSheetData(ss.getSheetByName(TAB_BROCHURE_ENQUIRIES)).slice().reverse();
    const contactMessages = readSheetData(ss.getSheetByName(TAB_CONTACT_MESSAGES)).slice().reverse();

    return createJsonResponse({
      status: "success",
      applications: applications,
      brochureEnquiries: brochureEnquiries,
      contactMessages: contactMessages
    });
  } catch (error) {
    return createJsonResponse({ status: "error", message: error.toString() });
  }
}

/**
 * Helper: Read Sheet Data into Array of Objects
 */
function readSheetData(sheet) {
  if (!sheet) return [];
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];
  const headers = rows[0];
  return rows.slice(1).map(row => {
    let obj = {};
    headers.forEach((header, index) => {
      let key = header.toLowerCase().replace(/[^a-zA-Z0-9]/g, "_");
      obj[key] = row[index];
    });
    return obj;
  });
}

/**
 * TAB 1: Process Job Applications (Upload Resume to Drive + Log in "Job Applications" Sheet)
 */
function processJobApplication(data) {
  let resumeUrl = "No Resume Attached";
  let resumeFileName = "N/A";

  if (data.fileBase64 && data.fileName) {
    const folder = getOrCreateDriveFolder();
    const contentType = data.fileMimeType || "application/pdf";
    const decodedBytes = Utilities.base64Decode(data.fileBase64);
    const blob = Utilities.newBlob(decodedBytes, contentType, data.fileName);

    const file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    resumeUrl = file.getUrl();
    resumeFileName = data.fileName;
  }

  const ss = getOrCreateSpreadsheet();
  let sheet = ss.getSheetByName(TAB_JOB_APPLICATIONS);
  if (!sheet) {
    sheet = ss.insertSheet(TAB_JOB_APPLICATIONS);
  }
  initJobApplicationsHeader(sheet);

  const applicationId = "APP-" + new Date().getTime().toString().slice(-6);
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const newRow = [
    applicationId,
    timestamp,
    data.fullName || "",
    data.email || "",
    data.phone || "",
    data.jobTitle || "",
    data.department || "",
    data.preferredLocation || "",
    resumeFileName,
    resumeUrl,
    data.message || "",
    "New"
  ];

  sheet.appendRow(newRow);

  return { applicationId: applicationId, timestamp: timestamp, resumeUrl: resumeUrl };
}

/**
 * TAB 2: Process Product Brochure Requests (Log in "Brochure Enquiries" Sheet)
 */
function processBrochureRequest(data) {
  const ss = getOrCreateSpreadsheet();
  let sheet = ss.getSheetByName(TAB_BROCHURE_ENQUIRIES);
  if (!sheet) {
    sheet = ss.insertSheet(TAB_BROCHURE_ENQUIRIES);
  }
  initBrochureEnquiriesHeader(sheet);

  const brochureId = "BRQ-" + new Date().getTime().toString().slice(-6);
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const newRow = [
    brochureId,
    timestamp,
    data.name || data.fullName || "",
    data.email || "",
    data.phone || "",
    data.organization || "",
    data.productName || "General Brochure",
    data.type || "Brochure Request",
    data.message || ""
  ];

  sheet.appendRow(newRow);

  return { brochureId: brochureId, timestamp: timestamp };
}

/**
 * TAB 3: Process Contact Us Messages (Log in "Contact Messages" Sheet)
 */
function processContactMessage(data) {
  const ss = getOrCreateSpreadsheet();
  let sheet = ss.getSheetByName(TAB_CONTACT_MESSAGES);
  if (!sheet) {
    sheet = ss.insertSheet(TAB_CONTACT_MESSAGES);
  }
  initContactMessagesHeader(sheet);

  const contactId = "MSG-" + new Date().getTime().toString().slice(-6);
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const newRow = [
    contactId,
    timestamp,
    data.fullName || data.name || "",
    data.email || "",
    data.phone || "",
    data.companyName || data.organization || "Not Specified",
    data.category || "General",
    data.subject || "Website Inquiry",
    data.message || ""
  ];

  sheet.appendRow(newRow);

  return { contactId: contactId, timestamp: timestamp };
}

/**
 * Update Application Status
 */
function updateApplicationStatus(appId, newStatus) {
  const ss = getOrCreateSpreadsheet();
  const sheet = ss.getSheetByName(TAB_JOB_APPLICATIONS);
  if (!sheet) throw new Error("Sheet not found");

  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === appId) {
      sheet.getRange(i + 1, 12).setValue(newStatus);
      return { id: appId, status: newStatus };
    }
  }

  throw new Error("Application ID not found");
}

/**
 * Delete a record row from a tab by ID
 */
function deleteRecordFromSheet(sheetName, idValue) {
  const ss = getOrCreateSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) throw new Error("Sheet not found: " + sheetName);

  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(idValue)) {
      sheet.deleteRow(i + 1);
      return { id: idValue, deleted: true };
    }
  }
  throw new Error("Record ID not found: " + idValue);
}

/**
 * Helper: Find or Create Spreadsheet
 */
function getOrCreateSpreadsheet() {
  const files = DriveApp.getFilesByName(SPREADSHEET_NAME);
  if (files.hasNext()) {
    return SpreadsheetApp.open(files.next());
  }
  const ss = SpreadsheetApp.create(SPREADSHEET_NAME);
  const defaultSheet = ss.getActiveSheet();
  defaultSheet.setName(TAB_JOB_APPLICATIONS);
  initJobApplicationsHeader(defaultSheet);
  return ss;
}

/**
 * Helper: Find or Create Google Drive Folder
 */
function getOrCreateDriveFolder() {
  const folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(DRIVE_FOLDER_NAME);
}

/**
 * Helper: Header for Tab 1 (Job Applications)
 */
function initJobApplicationsHeader(sheet) {
  if (sheet.getLastRow() === 0) {
    const headers = [
      "Application ID",
      "Submitted At",
      "Full Name",
      "Email Address",
      "Phone Number",
      "Job Title",
      "Department",
      "Preferred Location",
      "Resume File Name",
      "Google Drive Resume Link",
      "Cover Letter / Message",
      "Status"
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#005BAC").setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
  }
}

/**
 * Helper: Header for Tab 2 (Brochure Enquiries)
 */
function initBrochureEnquiriesHeader(sheet) {
  if (sheet.getLastRow() === 0) {
    const headers = [
      "Brochure Request ID",
      "Submitted At",
      "Full Name",
      "Email Address",
      "Phone Number",
      "Organization / Laboratory",
      "Product Name",
      "Request Type",
      "Message / Special Requirements"
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#F26522").setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
  }
}

/**
 * Helper: Header for Tab 3 (Contact Messages)
 */
function initContactMessagesHeader(sheet) {
  if (sheet.getLastRow() === 0) {
    const headers = [
      "Contact Message ID",
      "Submitted At",
      "Full Name",
      "Email Address",
      "Phone Number",
      "Company / Organization",
      "Product Category",
      "Subject",
      "Message"
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#0F766E").setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
  }
}

/**
 * Helper: Format JSON Response with CORS Headers
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
