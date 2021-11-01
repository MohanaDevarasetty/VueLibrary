<template>
  <section class="section">
    <div class="section-title">
      <div class="row flex-space-between">
        <div class="col-4 " style="text-align: left;">
          <h2>
            <span>{{ header }}</span>
          </h2>
        </div>
        <div class="col-7 flex-right">
          <div class="form-search">
            <div class="btn-link btn-view-all float-right" style="width: 100%">
              <input
                class="form-control search"
                name="searchParam"
                type="search"
                maxlength="255"
                style="width: 100%"
              />
              <!-- <button
                class="btn-search"
                type="submit"
                name=""
                value=""
              ></button> -->
            </div>
          </div>
          <div class="">
            <div>
              <button class="btn btn-primary" v-on:click="add">
                {{ buttonName }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section-content card-background card">
      <div class="row">
        <div class="list-card-header col-4">
          {{ title }}
        </div>
        <div
          class="col-7"
          style="
            text-align: center;
            display: flex;
            justify-content: flex-end;
          "
        >
          <button style="height: fit-content" class="btn btn-primary">Export Data</button>
        </div>
      </div>
      <Table :pageName="pageName" />
    </div>
  </section>
</template>



<script>

import Table from './Table.vue';

export default({
    name: "SummaryView",
    components: {
      Table
    },
    data() {
        return {
            header: '',
            placeholder: '',
            buttonName: '',
            title: '',
            pageName: ''
        }
    },
    methods: {
      add: function() {
        // Implement in child component
      }
    }
})
</script>

<style scoped>

.flex-space-between {
  display: flex;
  justify-content: space-between;
}

.section {
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 110px;
  height: 100%;
  /* overflow: scroll; */
}

.section-content {
  padding: 0 38px 30px;
  padding-top: 40px;
}

.section-header {
  padding: 0 38px 0;
}

.right-section {
  background-color: #fff;
  box-shadow: 0 0 15px rgba(69, 65, 78, 0.08);
}

.section-title {
  padding: 25px 0px 20px;
  color: #223345;
  font-family: Inter;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: NaNpx;
  line-height: 32px;
}
.flex-right {
  display: flex;
  margin-right: 20px;
  justify-content: space-evenly;
}

.list-card-header {
  height: 70px;
  padding-top: 5px;
  font-size: 18px;
  color: #222b45;
  font-family: Inter;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: NaNpx;
  line-height: 24px;
}
</style>
