import * as React from 'react';
import styles from './WebSites.module.scss';
import { IWebSitesProps } from './IWebSitesProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as pnp from 'sp-pnp-js';
import * as moment from 'moment';
require('./websites.css');
require('./sharepoint.css');
let colorArr = ["#0000FF", "#0000FF", "#D2691E", "#FF0000", "#2E8B57", "#FFD700", "#20B2AA", "#696969", "#663399", "#9400D3", "#FFA500", "#228B22", "#663399", "#8A2BE2", "#B22222", "#FF8C00"];
let color: string = "";
let i: number = 0;
let _websArr = [];
export default class WebSites extends React.Component<IWebSitesProps, any> {
    constructor(props: IWebSitesProps) {
        super(props);
        this.state = {
            webs: []
        };
    }
    private getColor(): string {
        i = Math.floor((Math.random() * colorArr.length - 1) + 1);
        color = colorArr[i];
        return color;
    }
    // Load subsites
    private _loadWebSites() {
        //let
        let _currentUser = this.props.pageContext.user.loginName;
        this.addSubSite(this.props.pageContext.web.absoluteUrl);
    }
    // 
    public componentDidMount() {
        this._loadWebSites();
    }

    // Render WebSites
    public render() {

        return (
            <div className="wrapper">
                {this.state.webs.length != 0 ? <p style={{ margintop: 0, marginBottom: 10 }} className="ms-font-xxl">{this.props.title}</p> : ''}

                <div className="sites-area">
                    {this.state.webs.map((_web: any, ix: number) => {
                        return (
                            <div className="ContainerCard social-buttons-in social-buttons-in">
                                <div><a href={_web.ServerRelativeUrl}>
                                    <div style={{ backgroundColor: 'rgba(192, 192, 192, 0.13)' }} aria-labelledby="cardNoActivitiesDesc" className="ContainerCard-header" data-focusable-context="ActivityCards" data-is-focusable="true" data-nested-context="Card" role="gridcell">
                                        <div title={_web.ServerRelativeUrl}><div className="ContainerCard-headerBackground" style={{ backgroundColor: this.getColor() }}>
                                        </div>
                                            <div className="ContainerCard-acronym" role="presentation" aria-hidden="true" style={{ backgroundColor: color }}>{_web.Title.substring(0, 1)}</div>
                                            <div className="ContainerCard-title" aria-label="Site">{_web.Title}</div>
                                            <div className="ContainerCard-subTitle">Last change on: {moment(_web.LastItemModifiedDate).format("DD MMMM YYYY")}</div>
                                    </div></div></a>
                                        <div className="ContainerCard-socialButtons">
                                        <div className="ContainerCard-buttons-float">
                                            <div aria-label="" className="ContainerCard-socialButton" data-focusable-context="Card" ><i role="presentation" title="" className="mdl2-Icon ms-Icon--Globe"></i>
                                            </div>
                                        </div>
                                    </div>
                                <div>
                                <div className="ContainerCard-socialButtons-overflow"><i className="mdl2-Icon mdl2-Icon--more"></i></div>
                                </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Add SubSites recursive
    private addSubSite(_webUrl: any) {
        let _iconUrl = '';
        let baseUrl = window.location.protocol + "//" + window.location.host;
        let _subWeb = new pnp.Web(_webUrl);
        _subWeb.getSubwebsFilteredForCurrentUser().filter("WebTemplate ne 'APP'").get()
            .then(_webs => {
                _webs.map((_web_: any, j: number) => {
                    _websArr.push(_web_);
                    this.addSubSite(`${baseUrl}${_web_.ServerRelativeUrl}`);
                    this.setState({
                        webs: _websArr
                    });
                });
            })
            .catch((reason: any) => {
                alert("Error on read subsites. Error: \n" + reason);
            });
    }
}


