"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var pnp = require("sp-pnp-js");
var moment = require("moment");
require('./websites.css');
require('./sharepoint.css');
var colorArr = ["#0000FF", "#0000FF", "#D2691E", "#FF0000", "#2E8B57", "#FFD700", "#20B2AA", "#696969", "#663399", "#9400D3", "#FFA500", "#228B22", "#663399", "#8A2BE2", "#B22222", "#FF8C00"];
var color = "";
var i = 0;
var _websArr = [];
var WebSites = (function (_super) {
    __extends(WebSites, _super);
    function WebSites(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            webs: []
        };
        return _this;
    }
    WebSites.prototype.getColor = function () {
        i = Math.floor((Math.random() * colorArr.length - 1) + 1);
        color = colorArr[i];
        return color;
    };
    // Load Item Attachments
    WebSites.prototype._loadWebSites = function () {
        //let
        var _currentUser = this.props.pageContext.user.loginName;
        this.addSubSite(this.props.pageContext.web.absoluteUrl);
    };
    // 
    WebSites.prototype.componentDidMount = function () {
        this._loadWebSites();
    };
    // Render WebSites
    WebSites.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "wrapper" },
            this.state.webs.length != 0 ? React.createElement("p", { style: { margintop: 0, marginBottom: 10 }, className: "ms-font-xxl" }, this.props.title) : '',
            React.createElement("div", { className: "sites-area" }, this.state.webs.map(function (_web, ix) {
                return (React.createElement("div", { className: "ContainerCard social-buttons-in social-buttons-in" },
                    React.createElement("div", null,
                        React.createElement("a", { href: _web.ServerRelativeUrl },
                            React.createElement("div", { style: { backgroundColor: 'rgba(192, 192, 192, 0.13)' }, "aria-labelledby": "cardNoActivitiesDesc", className: "ContainerCard-header", "data-focusable-context": "ActivityCards", "data-is-focusable": "true", "data-nested-context": "Card", role: "gridcell" },
                                React.createElement("div", { title: _web.ServerRelativeUrl },
                                    React.createElement("div", { className: "ContainerCard-headerBackground", style: { backgroundColor: _this.getColor() } }),
                                    React.createElement("div", { className: "ContainerCard-acronym", role: "presentation", "aria-hidden": "true", style: { backgroundColor: color } }, _web.Title.substring(0, 1)),
                                    React.createElement("div", { className: "ContainerCard-title", "aria-label": "Site" }, _web.Title),
                                    React.createElement("div", { className: "ContainerCard-subTitle" },
                                        "Last change on: ",
                                        moment(_web.LastItemModifiedDate).format("DD MMMM YYYY"))))),
                        React.createElement("div", { className: "ContainerCard-socialButtons" },
                            React.createElement("div", { className: "ContainerCard-buttons-float" },
                                React.createElement("div", { "aria-label": "", className: "ContainerCard-socialButton", "data-focusable-context": "Card" },
                                    React.createElement("i", { role: "presentation", title: "", className: "mdl2-Icon ms-Icon--Globe" })))),
                        React.createElement("div", null,
                            React.createElement("div", { className: "ContainerCard-socialButtons-overflow" },
                                React.createElement("i", { className: "mdl2-Icon mdl2-Icon--more" }))))));
            }))));
    };
    // Add SubSites recursive
    WebSites.prototype.addSubSite = function (_webUrl) {
        var _this = this;
        var _iconUrl = '';
        var baseUrl = window.location.protocol + "//" + window.location.host;
        var _subWeb = new pnp.Web(_webUrl);
        _subWeb.getSubwebsFilteredForCurrentUser().filter("WebTemplate ne 'APP'").get()
            .then(function (_webs) {
            _webs.map(function (_web_, j) {
                _websArr.push(_web_);
                console.log(baseUrl + "-" + _web_.ServerRelativeUrl);
                _this.addSubSite("" + baseUrl + _web_.ServerRelativeUrl);
                _this.setState({
                    webs: _websArr
                });
            });
        })
            .catch(function (reason) {
            alert("Error on read subsites. Error: \n" + reason);
        });
    };
    return WebSites;
}(React.Component));
exports.default = WebSites;

//# sourceMappingURL=WebSites.js.map
