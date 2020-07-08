// Copyright 2017 The Kubernetes Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Component, Input} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ResourceQuotaDetail} from 'typings/backendapi';

@Component({
  selector: 'kd-resource-quota-list',
  templateUrl: './template.html',
})
export class ResourceQuotaListComponent {
  @Input() initialized: boolean;
  @Input() quotas: ResourceQuotaDetail[];

  getQuotaColumns(): string[] {
    return ['name', 'created', 'status'];
  }

  getDataSource(): MatTableDataSource<ResourceQuotaDetail> {
    const tableData = new MatTableDataSource<ResourceQuotaDetail>();
    tableData.data = this.quotas;
    return tableData;
  }

  trackByResourceQuotaDetail(_: number, item: ResourceQuotaDetail): any {
    if (item.objectMeta.uid) {
      return `${item.objectMeta.uid}/${item.typeMeta.kind}`;
    }

    if (item.objectMeta.namespace) {
      return `${item.objectMeta.namespace}/${item.objectMeta.name}/${item.typeMeta.kind}`;
    }

    return `${item.objectMeta.name}/${item.typeMeta.kind}`;
  }
}