// ==UserScript==
// @name         Trello Share Button Clipboard Copy
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Copy Trello card name, due date, and URL to clipboard when clicking the "Share" button
// @author       YourName
// @match        https://trello.com/*
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    // Utility function to copy text to clipboard
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(function() {
            console.log("Copied to clipboard: ", text);
        }).catch(function(err) {
            console.error("Could not copy text: ", err);
        });
    }

    // Function to get card details (name, due date, URL)
    function getCardDetails() {
        let cardName = document.querySelector('[data-testid="card-back-title-input"]')?.value.trim() || "名称未設定";
        let dueDateElem = document.querySelector('[data-testid="due-date-badge-with-date-range-picker"] span');
        let dueDate = dueDateElem ? dueDateElem.innerText.trim() : "期日なし";
        let cardURLElem = document.querySelector('[data-testid="card-share-menu-short-url"]');
        let cardURL = cardURLElem ? cardURLElem.value.trim() : window.location.href;

        return `[info]\nトレロ: ${cardName}\n期日: ${dueDate}\nURL: ${cardURL}\n[/info]`;
    }

    // Observe clicks on the "Share" button
    document.body.addEventListener('click', function(event) {
        let target = event.target.closest('[data-testid="card-back-share-button"]');
        if (target) {
            setTimeout(function() {
                let cardDetails = getCardDetails();
                copyToClipboard(cardDetails);
                alert("詳細をクリップボードにコピーしました:\n\n" + cardDetails);
            }, 500); // Delay to ensure card modal is loaded
        }
    }, true);

    console.log("Trello Share Button Clipboard Copy script loaded.");
})();
