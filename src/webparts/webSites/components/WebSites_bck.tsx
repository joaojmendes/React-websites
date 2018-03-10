import * as React from 'react';
import styles from './WebSites.module.scss';
import { IWebSitesProps } from './IWebSitesProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as pnp from 'sp-pnp-js';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, } from 'office-ui-fabric-react/lib/Button';
require('./websites.css');
import {
  DocumentCard,
  // DocumentCardActivity,
  DocumentCardActions,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardType,
  IDocumentCardPreviewProps
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { PermissionKind } from 'sp-pnp-js';
let previewImages = new Array<any>();
let previewPropsUsingIcon: IDocumentCardPreviewProps;
export default class WebSites extends React.Component<IWebSitesProps, any> {
  constructor(props: IWebSitesProps) {
    super(props);
    this.state = {
      showDialog: false,
      dialogMessage: '',
      webs: []
    };
  }

  // Load Item Attachments
  private _loadWebSites() {
    previewImages = [];
    //  let _webs = pnp.sp.web.webs.get();
    // let item = pnp.sp.web.lists.getById(this.props.ListGuid)
    //     .items.getById(this.props.RaidId);
    let webSite = new pnp.Web(this.props.pageContext.web.absoluteUrl);
    let _currentUser = this.props.pageContext.user.loginName;
    let _websArr = [];
    webSite.webs.filter("WebTemplate ne 'APP'").get().then(_webs => {

      _webs.map((_web: any, i: number) => {
        let _iconUrl = '';
        let _subWeb = new pnp.Web(_web.Url);
        let _userHasPermission: boolean = false;
        _subWeb.currentUserHasPermissions(PermissionKind.ViewPages).then(_result => {
          if (_result == true) {
            _websArr.push(_web);
            previewImages.push({
              name: _web.Title,
              url: _web.Url,
              previewImageSrc: _web.SiteLogoUrl,
              previewIconProps: { iconName: 'Globe', styles: { root: { fontSize: 48, color: '#333333' } } },
              iconSrc: '',
              imageFit: ImageFit.cover,
              width: 120,
              height: 120,
              accentColor: '#0078d7'
            });
            this.setState({
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
      .catch((reason: any) => {
      /*  this.setState({
          showDialog: true,
          // tslint:disable-next-line:max-line-length
          dialogMessage: 'Error on read subsites. Error: ' + reason
        });*/
        alert("Error on read subsites. Error: " + reason);
      });
  }

  // Run befor render component
  public componentDidMount() {
    this._loadWebSites();
  }

  // Render Attachments
  public render() {
   
    return (
      <div>
        <p style={{ margintop: 0 }} className="ms-font-xxl">{this.props.title}</p>
        {this.state.webs.map((_web: any, i: number) => {
          return (
            <div className="DocumentCard" style={{ display: "inline-block", padding: 10 }}>
              <DocumentCard type={DocumentCardType.normal} onClickHref={_web.Url} >
                <DocumentCardPreview previewImages={[previewImages[i]]} />

                  <DocumentCardTitle
                    title={_web.Title}
                    shouldTruncate={true} />
              </DocumentCard>
            </div>
          );
        })}
        <Dialog
          isOpen={this.state.showDialog}
          type={DialogType.normal}
          onDismiss={this._closeDialog}
          title="WebSites"
          subText={this.state.dialogMessage}
          isBlocking={true}>
          <DialogFooter>
            <PrimaryButton onClick={this._closeDialog}>OK</PrimaryButton>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  // close dialog
  private _closeDialog(e: any) {
    //  
    e.preventDefault();
    this.setState({
      showDialog: false,
      dialogMessage: '',
    });
  }
}


