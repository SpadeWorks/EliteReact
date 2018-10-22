'use strict';
var listName = "RegistrationResponses";

function AttachmentTemplate(ctx) {
    var attachments = parseInt(ctx.CurrentItem.Attachments) || 0;
    var itemID = ctx.CurrentItem.ID;
    if (attachments > 0) {
        return "<a href='javascript:;' onClick='SP.UI.ModalDialog.OpenPopUpPage(\"/Lists/" + listName + "/CustomDisplayForm.aspx?ID=" + itemID + "\")' >View</a>";
    } else {
        return "";
    }
}

function TestDriveNameTemplate(ctx) {
    var itemID = ctx.CurrentItem.ID;
    var itemName = ctx.CurrentItem["Test_x0020_Drive_x0020_ID_x003a_"] || '';
    return "<a href='javascript:;' onClick='SP.UI.ModalDialog.OpenPopUpPage(\"/Lists/" + listName + "/CustomDisplayForm.aspx?ID=" + itemID + "\")' >" + itemName + "</a>";
}

(function() {
    var linkFieldContext = {};
    linkFieldContext.Templates = {};
    linkFieldContext.Templates.Fields = {
        'Test_x0020_Drive_x0020_ID_x003a_': { 'View': TestDriveNameTemplate },
        'Attachments': { 'View': AttachmentTemplate }
    };
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(linkFieldContext);
})();