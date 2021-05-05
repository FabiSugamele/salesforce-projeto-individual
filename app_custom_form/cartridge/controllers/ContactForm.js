'use strict';​
var server = require('server');​
server.get('Landing', server.middleware.https, function(req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    var contactForm = server.forms.getForm('contactBr');
    contactForm.clear();
    res.render('contactBr', {
        actionUrl: URLUtils.url('ContactForm-Subscribe').toString(),
        contactForm: contactForm

    });
    next();
});​
server.post('Subscribe', server.middleware.https, function(req, res, next) {
    //var Resource = require('dw/web/Resource');
    var contactForm = server.forms.getForm('contactBr');
    //var emailHelper = require('*/cartridge/scripts/helpers/emailHelpers');
    //var myForm = req.form;
    var customObjMgr = require('dw/object/CustomObjectMgr');
    var transaction = require('dw/system/Transaction');
    transaction.begin();
    try {
        var newSubscribe = customObjMgr.createCustomObject('fornecedor', contactForm.email.value);
        newSubscribe.custom.email = contactForm.email.value;
        newSubscribe.custom.nome = contactForm.nome.value;
        newSubscribe.custom.telefone = contactForm.telefone.value;
        //newSubscribe.custom.Message = contactForm.message.value;
        // var contactDetails = [myForm.name, myForm.email, myForm.phone, myForm.message];
        //res.json({
        //     success: true,
        //     msg: Resource.msg('success.message', 'form', null)
        // });
        res.render('mensagemConfirmacao', {
            contactForm: contactForm
        });
    } catch (e) {
        //Oops!
        transaction.rollback();
    }
    /*  var isValidEmailid = emailHelper.validateEmail(myForm.email);
      if (isValidEmailid) {
          var contactDetails = [ myForm.name, myForm.email, myForm.phone];
          res.json({
              success: true,
              msg: Resource.msg('subscribe.to.contact.us.success', 'contact', null)
          });
      } else {
          res.json({
              error: true,
              msg: Resource.msg('subscribe.to.contact.us.email.invalid', 'contact', null)
          });
      }*/
    return next();
});
module.exports = server.exports();