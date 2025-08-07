// ==UserScript==
// @name         Roblox "Connections" to "Friends"
// @version      1.0
// @description  Persistently changes "Connect(ions)" to "Friend(s)".
// @author       AeroTech (TechByAero)
// @match        https://www.roblox.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const rules = [
        // --- Friends Page Rules ---
        { selector: "#friends-web-app > div > div.page-header.section > div > h1", find: "My Connections", replace: "My Friends" },
        { selector: "h2.friends-subtitle", find: "Connections", replace: "Friends" },
        { selector: "span.text-lead", find: "Connections", replace: "Friends" },

        // --- Home Page Rules ---
        { selector: ".container-header.people-list-header h2", find: "Connections", replace: "Friends " },
        { selector: "span.friends-carousel-display-name", find: "Connect", replace: "Add Friend(s)" },

        // --- Profile Page Rules ---
        { selector: "#unfriend-button", find: "Remove Connection", replace: "Unfriend" },
        { selector: "#friend-button", find: "Add Connection", replace: "Add Friend" },
        { selector: "span.profile-header-social-count-label", find: "Connections", replace: "Friends" },
        { selector: "h1, h2", find: " Connections", replace: " Friends", endsWith: true },

        // --- Sidebar Rule ---
        { selector: "span.font-header-2.dynamic-ellipsis-item[title='Connect']", find: "Connect", replace: "Friends" }
    ];

    const persistentReplace = () => {
        rules.forEach(rule => {
            document.querySelectorAll(rule.selector).forEach(element => {
                const text = element.textContent;
                let newText = text;
                if (rule.endsWith) {
                    if (text.trim().endsWith(rule.find.trim())) newText = text.replace(rule.find, rule.replace);
                } else {
                    if (text.includes(rule.find)) newText = text.replace(rule.find, rule.replace);
                }
                if (element.textContent !== newText) element.textContent = newText;
            });
        });
    };
    setInterval(persistentReplace, 250);
})();
