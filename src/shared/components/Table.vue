<template>
  <div class="table-responsive">
    <table class="table table-striped table-borderless">
      <thead>
        <tr>
          <th v-for="(dynCmp, index) in dynamicJson" :key="index">
            <span>
              {{ dynCmp.displayname }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="pagedItems.length != 0 && isLoading === false">
          <tr v-for="(data, index) of pagedItems" :key="index">
            <td v-for="(col, i) in dynamicJson" :key="i">
              <span v-if="col.Fields === 'nameCard'">
                <TableNameCell :details="setCellDetails(data, col.groupPath)" />
              </span>
              <span v-else-if="col.Fields === 'priceWithCurrencyCard'">
                {{
                  getDetails(data, col.groupPath.price) +
                  " - " +
                  getDetails(data, col.groupPath.currency)
                }}
              </span>
              <span v-else-if="col.icons">
                <template v-if="col.privilege.edit">
                  <a class="mr-2 pointer">
                    <i class="fas fa-edit"></i>
                  </a>
                </template>
                <template v-if="col.privilege.remove">
                  <a class="mr-2 pointer">
                    <i class="fas fa-trash"></i>
                  </a>
                </template>
              </span>
              <span v-else-if="col.isButton">
                {{ "Button" }}
              </span>
              <span v-else-if="col.type && col.type === 'boolean'">
                <i
                  :class="[
                    getDetails(data, col.path)
                      ? 'fas fa-check'
                      : 'fas fa-times',
                  ]"
                ></i>
              </span>
              <span v-else>
                {{ getDetails(data, col.path) }}
              </span>
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr v-if="isLoading === false && dynamicJson.length === 0">
          <td :colspan="dynamicJson.length" id="noRecords" align="center">
            {{ "No records found" }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import httpClient from "../../shared/services/httpClient";
import TableNameCell from "./tableNameCell.vue";
import { getDataUsingJsonPath } from "../../shared/services/utilityService";
export default {
  name: "Table",
  components: {
    TableNameCell,
  },
  props: ['pageName'],
  data() {
    return {
      dynamicJson: [],
      isLoading: false,
      pagedItems: [],
      baseUrl: process.env.VUE_APP_BASE_URL
    };
  },
  created() {
    this.loadColumns();
    this.loadList();
  },
  mounted() {},
  methods: {
    loadColumns: function () {
      httpClient
        .get(`${this.baseUrl}/assets/mock/${this.pageName.replace(/ /g,"_")}_metadata.json`)
        .then((res) => {
          this.dynamicJson = res.data.fields;
        });
    },
    loadList: function () {
      this.isLoading = true;
      httpClient
        .get(
          "http://143.110.246.57:8022/fb/v1/product-service/admin/products?page=0&size=20"
        )
        .then((res) => {
          const details = res.data;
          console.log(details);
          if (
            details &&
            details.value &&
            details.value.content &&
            details.value.content.length
          ) {
            this.pagedItems = Object.assign(details.value.content);
          }
          this.isLoading = false;
        });
    },
    getDetails: function (object, path) {
      return getDataUsingJsonPath(object, path);
    },
    setCellDetails: function (data, path) {
      const details = {};
      details.imageUrl = getDataUsingJsonPath(data, path.image);
      details.title = getDataUsingJsonPath(
        data,
        path.name.replace("${language}", "english")
      );
      details.description = getDataUsingJsonPath(
        data,
        path.description.replace("${language}", "english")
      );
      return details;
    },
  },
};
</script>


<style scoped>
table.table {
  margin-bottom: 0px;
}

table.table thead {
  background-color: #f4f5f8;
}

.table-striped tbody tr {
  background-color: #f4f5f8;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #fff;
}
table.table .btn-link {
  border-bottom: inherit;
  text-decoration: underline;
  font-weight: 400;
}

table.table thead th {
  color: #575962;
  line-height: 16px;
  vertical-align: middle;
}

table thead th.sorting {
  background: url("~@/assets/icon-sorting.svg") no-repeat right center;
  background-size: 16px;
  opacity: 1;
  filter: alpha(opacity=100);
  cursor: pointer;
}

table thead th.sorting_asc {
  background: url("~@/assets/icon-sort-asc.svg") no-repeat right center;
  background-size: 16px;
  cursor: pointer;
}

table thead th.sorting_desc {
  background: url("~@/assets/icon-sort-desc.svg") no-repeat right center;
  background-size: 16px;
  cursor: pointer;
}

td {
  padding: 0px;
  color: #223345;
  font-size: 12px;
}

th {
  text-align: left;
  font-family: arial, sans-serif;
  padding: 10px 0;
  color: #7d9eb5;
  font-weight: 100;
  font-size: 13px;
}
</style>
