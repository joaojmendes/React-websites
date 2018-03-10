import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'WebSitesWebPartStrings';
import WebSites from './components/WebSites';
import { IWebSitesProps } from './components/IWebSitesProps';

export interface IWebSitesWebPartProps {
  title: string;
}

export default class WebSitesWebPart extends BaseClientSideWebPart<IWebSitesWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IWebSitesProps > = React.createElement(
      WebSites,
      {
        title: this.properties.title,
        pageContext: this.context.pageContext
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
