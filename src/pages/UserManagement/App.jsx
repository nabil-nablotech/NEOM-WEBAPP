
import { css } from "styled-components";
import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import UserManagement from "./components/UserManagement";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:path(|user-management)">
          <UserManagement {...userManagementData} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
const siteListViewItemUser1Data = {
    spanText4: "Editor",
};

const siteListViewItemUser2Data = {
    spanText4: "Editor",
    className: "site-list-view-item-user-1",
};

const siteListViewItemUser3Data = {
    spanText4: "Admin",
    className: "site-list-view-item-user-2",
};

const siteListViewItemUser4Data = {
    spanText4: "Editor",
    className: "site-list-view-item-user-3",
};

const iconActions2Data = {
    className: "icon-actions-1",
};

const iconActions3Data = {
    className: "icon-actions-2",
};

const iconActions4Data = {
    className: "icon-actions-3",
};

const userManagementData = {
    logo1: "/img/logo-1-1@2x.png",
    spanText1: "MA",
    icon1: "/img/icon@1x.png",
    iconSettings: "/img/icon-button-settings@1x.png",
    spanText2: "USERS",
    icon2: "/img/icon-2@2x.png",
    spanText3: "user",
    iconSearch: "/img/leading-icon@1x.png",
    spanText4: "Search",
    spanText5: "LAST NAME",
    sortAscending: "/img/sort-ascending-1@2x.png",
    spanText6: "FIRST NAME",
    spanText7: "EMAIL ADDRESS",
    spanText8: "ROLE ASSIGNED",
    spanText9: "LAST LOGIN",
    spanText10: "STATUS",
    line30: "/img/line-30-1@2x.png",
    line32: "/img/line-33-1@2x.png",
    line33: "/img/line-33-1@2x.png",
    line34: "/img/line-33-1@2x.png",
    line35: "/img/line-33-1@2x.png",
    line31: "/img/line-33-1@2x.png",
    siteListViewItemUser1Props: siteListViewItemUser1Data,
    siteListViewItemUser2Props: siteListViewItemUser2Data,
    siteListViewItemUser3Props: siteListViewItemUser3Data,
    siteListViewItemUser4Props: siteListViewItemUser4Data,
    iconActions1Props: iconActions2Data,
    iconActions2Props: iconActions3Data,
    iconActions3Props: iconActions4Data,
};

