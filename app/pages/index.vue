<script setup lang="ts">
import Tickets from "~/components/Layout/I/Sidebar/Tickets.vue";
import Gallery from "~/components/Layout/I/Sidebar/Gallery.vue";
import Verification from "~/components/Layout/I/Sidebar/Verification.vue";
import Admins from "~/components/Layout/I/Sidebar/Admins.vue";
import Reports from "~/components/Layout/I/Sidebar/Reports.vue";
import { fetchHomeStats } from "~/core/@services/home/fetch";
import type { HomeStatsDto } from "~/core/@services/home/types";
const stats = ref<HomeStatsDto>();
const isFetched = ref(false);
onMounted(() => {
  fetchHomeStats()
    .then(({ data }) => {
      stats.value = data;
    })
    .finally(() => (isFetched.value = true));
});
</script>

<template>
  <div>
    <span class="border-athens-gray mt-4 pb-2 text-xl font-semibold"> Welcome to Doujboard Dashboard </span>
    <DataTemplate :data="isFetched" :is-fetched="isFetched">
      <div class="section-home-grid-con">
        <CSharedNavigatorCard
          color="orange"
          :count="stats?.reports"
          title="Reports"
          :route="RouteRegistry.findRouteByName('ISSUES_HOME')"
          :icon="Reports" />
        <CSharedNavigatorCard
          color="red"
          :count="stats?.suspended_users"
          title="Suspended Users"
          :route="RouteRegistry.findRouteByName('USER_SUSPENDS')" />
        <CSharedNavigatorCard
          color="brown"
          :count="stats?.online_users"
          title="Online Users"
          :route="RouteRegistry.findRouteByName('USER_DIRECTORY')"
          path="/user/directory?online=true" />
        <CSharedNavigatorCard
          color="green"
          :count="stats?.tickets"
          title="Tickets"
          :route="RouteRegistry.findRouteByName('TICKET_HOME')"
          :icon="Tickets" />
        <!-- link="/user/list" -->
        <CSharedNavigatorCard
          color="yellow"
          :count="stats?.gallery"
          title="Gallery"
          :route="RouteRegistry.findRouteByName('GALLERY_HOME')"
          :icon="Gallery" />
        <!-- link="/user/list" -->
        <CSharedNavigatorCard
          color="gray"
          :count="stats?.active_users"
          title="Active Users"
          path="/user/directory?user_status=active"
          :route="RouteRegistry.findRouteByName('USER_DIRECTORY')" />
        <!-- link="/user/list" -->
        <CSharedNavigatorCard
          color="blue"
          :count="stats?.verification_requests"
          title="Verification Request"
          :route="RouteRegistry.findRouteByName('VERIFICATION_HOME')"
          :icon="Verification" />
        <!-- link="/user/list" -->
        <CSharedNavigatorCard
          color="purple"
          :count="stats?.admins"
          title="Admin"
          :route="RouteRegistry.findRouteByName('ADMIN_DIRECTORY')"
          :icon="Admins" />
        <!-- link="/user/list" -->
        <CSharedNavigatorCard
          color="pink"
          :count="stats?.total_users"
          title="Total Users"
          :route="RouteRegistry.findRouteByName('USER_DIRECTORY')" />
        <!-- link="/user/list" -->
      </div>
      <template #loading>
        <div class="section-home-grid-con">
          <CSharedNavigatorCardSkeleton v-for="value in 12" :key="value" />
        </div>
      </template>
    </DataTemplate>
  </div>
</template>
