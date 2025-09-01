// ==UserScript==
// @name         Roblox "Connections" to "Friends"
// @version      2.0
// @description  Persistently changes every last instance of "Connect(ions)" to "Friend(s)".
// @author       AeroTech (TechByAero)
// @match        https://www.roblox.com/*
// @grant        none
// ==/UserScript==

// By using this script, you agree to AeroTech's Open-Source License Policy (https://support.techbyaero.com/en-us/policies/open-source-license)

(function() {
    'use strict';

    const rules = [
        { type: 'text', selector: "#friends-web-app > div > div.page-header.section > div > h1", find: "My Connections", replace: "My Friends" },
        { type: 'text', selector: "h2.friends-subtitle", find: "Connections", replace: "Friends" },
        { type: 'text', selector: "span.text-lead", find: "Connections", replace: "Friends" },
        { type: 'text', selector: ".container-header.people-list-header h2", find: "Connections", replace: "Friends " },
        { type: 'text', selector: "span.friends-carousel-display-name", find: "Connect", replace: "Add Friend(s)" },
        { type: 'text', selector: "#unfriend-button", find: "Remove Connection", replace: "Unfriend" },
        { type: 'text', selector: "#friend-button", find: "Add Connection", replace: "Add Friend" },
        { type: 'text', selector: "span.profile-header-social-count-label", find: "Connections", replace: "Friends" },
        { type: 'text', selector: "span.font-header-2.dynamic-ellipsis-item[title='Connect']", find: "Connect", replace: "Friends" },
        { type: 'text', selector: "h1, h2", find: " Connections", replace: " Friends", endsWith: true },
        { type: 'placeholder', selector: "input.friends-filter-searchbar-input", find: "Search Connections", replace: "Search Friends" },
        { type: 'text', selector: "h2.server-list-header", find: "Connections", replace: "Friends" },
        { type: 'text', selector: ".friends-in-server-label", find: "Connections", replace: "Friends" },
        { type: 'text', selector: "span.mutual-friends-tooltip-label", find: "Connection", replace: "Friend" },
        { type: 'text', selector: "span.play-with-others-text", find: "connections", replace: "friends" }
    ];

    const persistentReplace = () => {
        rules.forEach(rule => {
            const elements = document.querySelectorAll(rule.selector);
            elements.forEach(element => {
                if (rule.type === 'placeholder') {
                    if (element.placeholder && element.placeholder.includes(rule.find)) {
                        element.placeholder = element.placeholder.replace(rule.find, rule.replace);
                    }
                } else { // Default to 'text'
                    const text = element.textContent;
                    let newText = text;

                    if (rule.endsWith) {
                        if (text.trim().endsWith(rule.find.trim())) {
                            newText = text.replace(rule.find, rule.replace);
                        }
                    } else {
                        if (text.includes(rule.find)) {
                            newText = text.replace(rule.find, rule.replace);
                        }
                    }
                    
                    if (element.textContent !== newText) {
                        element.textContent = newText;
                    }
                }
            });
        });
    };

    setInterval(persistentReplace, 250);
})();
