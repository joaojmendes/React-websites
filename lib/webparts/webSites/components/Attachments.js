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
//import * as $ from 'jquery';
var pnp = require("sp-pnp-js");
var Dialog_1 = require("office-ui-fabric-react/lib/Dialog");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var DocumentCard_1 = require("office-ui-fabric-react/lib/DocumentCard");
var Image_1 = require("office-ui-fabric-react/lib/Image");
//let previewProps: IDocumentCardPreviewProps;
var previewImages = new Array();
//let _documentCards: any = '';
var Attachments = (function (_super) {
    __extends(Attachments, _super);
    function Attachments(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showDialog: false,
            dialogMessage: '',
            webs: []
        };
        return _this;
        // registo de event handlers
        // 
    }
    // Load Item Attachments
    Attachments.prototype._loadWebSites = function () {
        var _this = this;
        previewImages = [];
        //  let _webs = pnp.sp.web.webs.get();
        // let item = pnp.sp.web.lists.getById(this.props.ListGuid)
        //     .items.getById(this.props.RaidId);
        pnp.sp.web.webs
            .get().then(function (_webs) {
            _webs.map(function (_web, i) {
                var _iconUrl = '';
                previewImages.push({
                    name: _web.Title,
                    url: _web.Url,
                    previewImageSrc: '',
                    iconSrc: _web.SiteLogoUrl,
                    imageFit: Image_1.ImageFit.cover,
                    width: 200,
                    height: 100,
                    accentColor: '#0078d7'
                });
            });
            _this.setState({
                webs: _webs
            });
        })
            .catch(function (reason) {
            _this.setState({
                showDialog: true,
                // tslint:disable-next-line:max-line-length
                dialogMessage: 'Error on read file Attachments. Error: ' + reason
            });
        });
    };
    // Run befor render component
    Attachments.prototype.componentDidMount = function () {
        this._loadWebSites();
    };
    // Render Attachments
    Attachments.prototype.render = function () {
        return (React.createElement("div", null,
            this.state.webs.map(function (_web, i) {
                return (React.createElement("div", { className: "DocumentCard", style: { marginTop: 15 } },
                    React.createElement(DocumentCard_1.DocumentCard, { onClickHref: _web.Url },
                        React.createElement(DocumentCard_1.DocumentCardPreview, { previewImages: [previewImages[i]] }),
                        React.createElement(DocumentCard_1.DocumentCardTitle, { title: _web.Title, shouldTruncate: true }))));
            }),
            React.createElement(Dialog_1.Dialog, { isOpen: this.state.showDialog, type: Dialog_1.DialogType.normal, onDismiss: this._closeDialog, title: "WebSites", subText: this.state.dialogMessage, isBlocking: true },
                React.createElement(Dialog_1.DialogFooter, null,
                    React.createElement(Button_1.PrimaryButton, { onClick: this._closeDialog }, "OK")))));
    };
    // close dialog
    Attachments.prototype._closeDialog = function (e) {
        //  
        e.preventDefault();
        this.setState({
            showDialog: false,
            dialogMessage: '',
        });
    };
    return Attachments;
}(React.Component));
exports.Attachments = Attachments;
exports.default = Attachments;

//# sourceMappingURL=Attachments.js.map
