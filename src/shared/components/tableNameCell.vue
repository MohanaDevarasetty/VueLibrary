<template>
    <div class="row" style="align-items: center;margin-left: 0px;">
    <div class="col-xs-3">
        <img v-if="!details.imageUrl" src="~@/assets/profile-icon.png" alt="image" style="height: 40px;
            width: 40px;">
        <img v-if="details.imageUrl" :src="details.imageUrl" alt="image" style="height: 40px;
        width: 40px;">
    </div>
    <div class="col-xs-9">
        <h6 class="user_name">
            {{ details.title ? details.title : 'Name' }}
        </h6>
        <h6 style="padding: 0px; margin: 0px; font-size: 12px;margin-left: 9px;">
            {{ details.description ? details.description : 'Description' }}
        </h6>
    </div>
</div>
</template>


<script>

export default({
    name: "TableNameCell",
    props: ['details']
})
</script>
