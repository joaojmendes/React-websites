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
var Dialog_1 = require("office-ui-fabric-react/lib/Dialog");
var Button_1 = require("office-ui-fabric-react/lib/Button");
require('./websites.css');
var DocumentCard_1 = require("office-ui-fabric-react/lib/DocumentCard");
var Image_1 = require("office-ui-fabric-react/lib/Image");
var sp_pnp_js_1 = require("sp-pnp-js");
var previewImages = new Array();
var previewPropsUsingIcon;
var WebSites = (function (_super) {
    __extends(WebSites, _super);
    function WebSites(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showDialog: false,
            dialogMessage: '',
            webs: []
        };
        return _this;
    }
    // Load Item Attachments
    WebSites.prototype._loadWebSites = function () {
        var _this = this;
        previewImages = [];
        //  let _webs = pnp.sp.web.webs.get();
        // let item = pnp.sp.web.lists.getById(this.props.ListGuid)
        //     .items.getById(this.props.RaidId);
        var webSite = new pnp.Web(this.props.pageContext.web.absoluteUrl);
        var _currentUser = this.props.pageContext.user.loginName;
        var _websArr = [];
        webSite.webs.filter("WebTemplate ne 'APP'").get().then(function (_webs) {
            _webs.map(function (_web, i) {
                var _iconUrl = '';
                var _subWeb = new pnp.Web(_web.Url);
                var _userHasPermission = false;
                _subWeb.currentUserHasPermissions(sp_pnp_js_1.PermissionKind.ViewPages).then(function (_result) {
                    if (_result == true) {
                        _websArr.push(_web);
                        previewImages.push({
                            name: _web.Title,
                            url: _web.Url,
                            previewImageSrc: _web.SiteLogoUrl,
                            previewIconProps: { iconName: 'Globe', styles: { root: { fontSize: 48, color: '#333333' } } },
                            iconSrc: '',
                            imageFit: Image_1.ImageFit.cover,
                            width: 120,
                            height: 120,
                            accentColor: '#0078d7'
                        });
                        _this.setState({
                            webs: _websArr
                        });
                    }
                });
                /*   previewImages.push({
                     previewIconProps: { iconName: 'Globe', styles: { root: { fontSize: 42, color: '#0080ff' } } },
                     width: 120,
                     height: 120
                   });
                    previewPropsUsingIcon = {
                     previewImages: previewImages
                   }; */
            });
        })
            .catch(function (reason) {
            /*  this.setState({
                showDialog: true,
                // tslint:disable-next-line:max-line-length
                dialogMessage: 'Error on read subsites. Error: ' + reason
              });*/
            alert("Error on read subsites. Error: " + reason);
        });
    };
    // Run befor render component
    WebSites.prototype.componentDidMount = function () {
        this._loadWebSites();
    };
    // Render Attachments
    WebSites.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("p", { style: { margintop: 0 }, className: "ms-font-xxl" }, this.props.title),
            this.state.webs.map(function (_web, i) {
                return (React.createElement("div", { className: "DocumentCard", style: { display: "inline-block", padding: 10 } },
                    React.createElement(DocumentCard_1.DocumentCard, { type: DocumentCard_1.DocumentCardType.normal, onClickHref: _web.Url },
                        React.createElement(DocumentCard_1.DocumentCardPreview, { previewImages: [previewImages[i]] }),
                        React.createElement(DocumentCard_1.DocumentCardTitle, { title: _web.Title, shouldTruncate: true }))));
            }),
            React.createElement(Dialog_1.Dialog, { isOpen: this.state.showDialog, type: Dialog_1.DialogType.normal, onDismiss: this._closeDialog, title: "WebSites", subText: this.state.dialogMessage, isBlocking: true },
                React.createElement(Dialog_1.DialogFooter, null,
                    React.createElement(Button_1.PrimaryButton, { onClick: this._closeDialog }, "OK")))));
    };
    // close dialog
    WebSites.prototype._closeDialog = function (e) {
        //  
        e.preventDefault();
        this.setState({
            showDialog: false,
            dialogMessage: '',
        });
    };
    return WebSites;
}(React.Component));
exports.default = WebSites;

//# sourceMappingURL=WebSites_bck.js.map
