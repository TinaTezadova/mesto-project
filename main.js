(()=>{"use strict";var e=function(e){return e.filter((function(e){return!0===e.validity.valid})).length===e.length},t=document.querySelectorAll(".popup"),n=document.querySelector("#photo-viewier"),o=function(e){var t=document.querySelector(".popup_open");"Escape"===e.key&&r(t)}.bind();function r(e){document.removeEventListener("keydown",o),e.classList.remove("popup_open")}function c(e){document.addEventListener("keydown",o),e.classList.add("popup_open")}var i={baseUrl:"https://nomoreparties.co/v1/plus-cohort-9",headers:{authorization:"200c38ce-1a1c-4131-9fd9-c0901ac5e0ba","Content-Type":"application/json"}},a=document.querySelector("#card-item-template").content,u=document.querySelector("#photo-viewier"),l=u.querySelector(".photo-veiwier__image"),d=u.querySelector(".photo-viewier__caption"),s=document.querySelector("#deleteCard"),f=function(e){var t,n=e.target.parentNode.parentNode.parentNode,o=n.id,r=n.querySelector(".card-item__likes-count");e.target.classList.contains("card-item__button_active")?(t=o,fetch("".concat(i.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:i.headers})).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(t){e.target.classList.remove("card-item__button_active"),r.textContent=t.likes.length})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(i.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:i.headers})}(o).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(t){e.target.classList.add("card-item__button_active"),r.textContent=t.likes.length})).catch((function(e){console.log(e)}))},m=function(e){var t,n;n=e.target.parentNode.parentNode.id,(t=s).setAttribute("cardId",n),c(t)};function p(e,t,n,o,r){var i=a.querySelector(".card-item").cloneNode(!0),s=i.querySelector(".card-item__img"),p=i.querySelector(".card-item__name"),v=i.querySelector("#card-item__like-button"),_=i.querySelector(".card-item__button_type_delete-card"),y=i.querySelector(".card-item__likes-count");return p.textContent=e,i.id=r,s.src=t,s.alt=e,y.textContent=n,v.addEventListener("click",f),s.addEventListener("click",(function(){!function(e,t){l.src=e,l.alt=t,d.textContent=t,c(u)}(t,e)})),"2db01ba02817beb6216f1735"!==o?_.classList.add("card-item__button_delete-unactive"):_.addEventListener("click",m),i}var v=function(e){e.reset()},_=document.querySelector("#editProfile"),y=document.querySelector(".profile__button_type_edit-profile"),h=document.querySelector(".popup__button"),S=_.querySelector("#userName"),b=document.querySelector(".profile__name"),q=_.querySelector("#user-field-of-activity"),k=document.querySelector(".profile__field-of-activity"),C=_.querySelector(".edit-form"),E=document.querySelector(".cards-container"),g=document.querySelector("#addCard"),L=document.querySelector(".profile__button_type_add"),P=g.querySelector("#addCardPopupBtn"),x=g.querySelector(".edit-form"),j=document.querySelector("#photo-viewier").querySelector("#photo-viewier-close-btn"),N=g.querySelector("#card-name"),A=g.querySelector("#card-link"),F=document.querySelector(".profile__name"),w=document.querySelector(".profile__field-of-activity"),U=document.querySelector(".profile__avatar"),O=document.querySelector(".profile__avatar-wrapper"),B=document.querySelector("#editAvatar"),T=B.querySelector(".edit-form"),D=document.querySelector("#deleteCard"),I=D.querySelector(".edit-form");var J;y.addEventListener("click",(function(){S.value=b.textContent,q.value=k.textContent,c(_)})),h.addEventListener("click",(function(){r(_)})),C.addEventListener("submit",(function(e){!function(e,t){e.preventDefault();var n,o,c,a=t.editProfilePopup.querySelector(".edit-form__button");a.textContent="Сохранение...",(n={name:t.userNameFromPopup.value,about:t.userFieldOfActivityFromPopup.value},o=n.name,c=n.about,fetch("".concat(i.baseUrl,"/users/me"),{method:"PATCH",headers:i.headers,body:JSON.stringify({name:o,about:c})})).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){t.userNameFromProfile.textContent=e.name,t.userFieldOfActivityFromProfile.textContent=e.about})).finally((function(){r(t.editProfilePopup),a.textContent="Сохранить"})).catch((function(e){console.log(e)}))}(e,{userNameFromProfile:b,userNameFromPopup:S,userFieldOfActivityFromProfile:k,userFieldOfActivityFromPopup:q,editProfilePopup:_})})),fetch("".concat(i.baseUrl,"/cards"),{headers:i.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){e.forEach((function(e){return E.append(p(e.name,e.link,e.likes.length,e.owner._id,e._id))}))})).catch((function(e){console.log(e)})),L.addEventListener("click",(function(){g.querySelector(".edit-form__button").classList.add("edit-form__button_disabled"),c(g)})),P.addEventListener("click",(function(){r(g)})),x.addEventListener("submit",(function(e){return function(e,t,n){e.preventDefault();var o,c,a,u=g.querySelector(".edit-form__button");u.textContent="Сохранение...",(o={name:N.value,link:A.value},c=o.name,a=o.link,fetch("".concat(i.baseUrl,"/cards"),{method:"POST",headers:i.headers,body:JSON.stringify({name:c,link:a})})).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){t.prepend(p(e.name,e.link,e.likes.length,e.owner._id,e._id))})).finally((function(){r(g),v(n),u.textContent="Создать"})).catch((function(e){console.log(e)}))}(e,E,x)})),j.addEventListener("click",(function(){r(n)})),J={formSelector:".edit-form",inputSelector:".edit-form__input",submitButtonSelector:".edit-form__button",inactiveButtonClass:"edit-form__button_disabled",inputErrorClass:"edit-form__input_error",errorClass:"edit-form__input__signature_active"},document.querySelectorAll(J.formSelector).forEach((function(t){var n=Array.from(t.querySelectorAll(J.inputSelector)),o=t.querySelector(J.submitButtonSelector);n.forEach((function(t){t.addEventListener("input",(function(){!function(t,n,o,r){t.validity.valid?(function(e,t,n){e.classList.remove(t);var o=null==e?void 0:e.nextSibling.nextElementSibling;o.classList.remove(n),o.textContent=""}(t,r.inputErrorClass,r.errorClass),e(n)&&(o.classList.remove(r.inactiveButtonClass),o.disabled=!1)):(function(e,t,n,o){e.classList.add(n);var r=e.nextSibling.nextElementSibling;r.textContent=t,r.classList.add(o)}(t,t.validationMessage,r.inputErrorClass,r.errorClass),e(n)||(o.classList.add(r.inactiveButtonClass),o.disabled=!0))}(t,n,o,J)}))})),t.addEventListener("click",(function(e){e.stopPropagation()}))})),t.forEach((function(e){return e.addEventListener("click",(function(){return r(e)}))})),function(e,t,n){fetch("".concat(i.baseUrl,"/users/me"),{headers:i.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(o){e.textContent=o.name,t.textContent=o.about,n.src=o.avatar})).catch((function(e){console.log(e)}))}(F,w,U),O.addEventListener("click",(function(){c(B)})),T.addEventListener("submit",(function(e){e.preventDefault();var t=B.querySelector(".edit-form__button");t.textContent="Сохранение...";var n=B.querySelector(".edit-form__input").value,o=B.querySelector(".edit-form");(function(e){return fetch("".concat(i.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:i.headers,body:JSON.stringify({avatar:e})})})(n).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){U.src=e.avatar})).finally((function(){r(B),v(o),t.textContent="Сохранить"})).catch((function(e){console.log(e)}))})),I.addEventListener("submit",(function(e){e.preventDefault();var t,n=D.getAttribute("cardId"),o=document.getElementById("".concat(n));(t=n,fetch("".concat(i.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:i.headers})).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){o.remove()})).finally((function(){r(D)})).catch((function(e){console.log(e)}))}))})();