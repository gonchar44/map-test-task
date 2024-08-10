interface Params {
  title: string
  address: string
  url: string
}

export const buildMapPlaceCard = ({ title, address, url }: Params) => `
    <div class="w-9/12 flex flex-col gap-y-0.5 absolute top-0 left-0 p-2 text-black">
      <span class="font-bold truncate" title="${title}">${title}</span>
      <span class="truncate" title="${address}">${address}</span>
      <a class="text-secondary-link outline-0" target="_blank" href="${url}">View</a>
    </div>
  `
