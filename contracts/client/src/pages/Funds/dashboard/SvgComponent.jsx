import * as React from "react"

const SvgComponent = (props) => (
  <svg
    height={16}
    viewBox="0 0 30 30"
    width={16}
    xmlns="http://www.w3.org/2000/svg"
    style={{
      color: "#664eff",
    }}
    {...props}
  >
    <defs>
      <clipPath id="a">
        <path fill="#664eff" d="M2.328 4.223h25.406v20.32H2.328Zm0 0" />
      </clipPath>
    </defs>
    <g clipPath="url(#a)">
      <path
        d="m27.5 7.531-3.035-2.988a.797.797 0 0 0-1.117 0L11.035 16.668l-4.21-4.145a.825.825 0 0 0-1.122 0L2.641 15.54a.771.771 0 0 0 0 1.102l7.804 7.683a.795.795 0 0 0 1.121 0L27.5 8.633a.772.772 0 0 0 .234-.551.779.779 0 0 0-.234-.55Zm0 0"
        fill="#664eff"
      />
    </g>
  </svg>
)

export default SvgComponent