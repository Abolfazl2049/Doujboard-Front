<template>
  <main id="default-layout-con" class="group flex">
    <div class="w-full flex-col pl-30 transition-all duration-500 data-[sidebar-expanded=true]:pl-70 max-lg:pl-0!">
      <LayoutNavbar />
      <div class="default-layout-page-parent" :key="`page-key-${0}`">
        <slot />
      </div>
    </div>
  </main>
</template>
