import { HTMLAttributes } from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  display: block;
  flex-shrink: 0;
  width: 100px;
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
    width: 130px;
  }
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletLandscapeStart}) {
    width: 184px;
  }
`

export const CirclesLogo: React.FC<HTMLAttributes<SVGElement>> = (props) => {
  const { className, ...restProps } = props

  return (
    <Wrapper
      className={`CirclesLogo ${className}`}
      fill="none"
      height="83"
      viewBox="0 0 184 83"
      width="184"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <g clipPath="url(#clip0_150_855)">
        <path
          d="M49.4986 41.3686C49.4983 43.3672 48.7553 45.2943 47.4141 46.775C46.0728 48.2557 44.2293 49.1842 42.242 49.38C40.2546 49.5757 38.2656 49.0246 36.6618 47.8339C35.0579 46.6431 33.9539 44.8979 33.5644 42.9377C33.1749 40.9774 33.5279 38.9423 34.5545 37.228C35.5812 35.5138 37.2083 34.243 39.1192 33.6628C41.0301 33.0827 43.0884 33.2346 44.8936 34.0891C46.6988 34.9436 48.1219 36.4396 48.8862 38.2861C49.2905 39.2634 49.4986 40.3108 49.4986 41.3686Z"
          fill="#F7AB28"
        />
        <path
          d="M41.9643 0.0153809C19.3833 0.0153809 1.07453 18.3382 1.07397 40.9407C1.07342 63.5433 19.3811 81.8644 41.9643 81.8644C48.2647 81.8641 54.4799 80.4067 60.1248 77.6058C65.7696 74.805 70.6915 70.7365 74.5062 65.7179C75.5204 63.8403 76.0515 61.7396 76.0517 59.6053C76.0517 52.4994 70.2963 46.7391 63.1965 46.7391C61.2342 46.7416 59.2985 47.1937 57.5377 48.0607C55.7769 48.9277 54.2378 50.1866 53.0383 51.7409C53.0391 51.7381 53.0391 51.735 53.0383 51.7321C51.5875 53.3901 49.7997 54.7189 47.7945 55.6297C45.7892 56.5405 43.6128 57.0122 41.4108 57.0134C32.8675 57.0134 25.9411 50.0812 25.9411 41.5305C25.9411 32.9799 32.8658 26.0499 41.4091 26.0499C43.5176 26.0523 45.6032 26.486 47.5381 27.3243C49.4731 28.1627 51.2164 29.3879 52.6611 30.9249C53.8603 32.5946 55.4391 33.9549 57.2671 34.8936C59.0951 35.8322 61.1199 36.3224 63.1744 36.3237C70.331 36.3237 76.1326 30.517 76.1326 23.3544C76.1305 20.2602 75.0229 17.2688 73.0098 14.9206C72.8769 14.7224 72.732 14.5326 72.5758 14.3523C65.2635 5.86666 54.5628 0.389113 42.5778 0.0203417C42.3737 0.0170343 42.1692 0.0153809 41.9643 0.0153809Z"
          fill="url(#paint0_linear_150_855)"
        />
        <path
          d="M2.69149 44.6621C1.78605 44.7172 1.40162 46.7414 1.39941 52.0254C6.10893 69.6648 22.1838 82.6583 41.2934 82.6583C43.6486 82.659 45.9997 82.4593 48.3211 82.0613C61.0265 79.2831 71.3845 70.2259 75.9861 58.3034C75.3318 51.8116 69.8551 46.7441 63.1964 46.7441C61.5222 46.7467 59.8647 47.0764 58.3167 47.7148C56.7598 48.8493 55.1631 50.0046 53.5252 51.1556C53.3585 51.3471 53.1971 51.5438 53.041 51.746C53.0418 51.7431 53.0418 51.74 53.041 51.7371C50.9783 54.0939 48.2495 55.7687 45.2154 56.54C39.6615 59.7592 34.0168 62.1013 28.8061 62.1013C12.8579 62.0986 5.41608 44.4912 2.69149 44.6621Z"
          fill="url(#paint1_linear_150_855)"
        />
        <path
          d="M27.8363 5.61756C24.5242 5.61575 21.2322 6.13167 18.0792 7.14666C7.16703 14.5844 4.6767e-05 27.1188 4.6767e-05 41.3294C-0.0125795 49.7084 2.53174 57.8914 7.2926 64.7836C13.1161 69.4669 20.3653 72.0151 27.8358 72.0047C43.1854 72.0047 56.0764 61.4729 59.6904 47.2358C57.0484 47.9884 54.7169 49.5685 53.0378 51.7443C53.0386 51.7414 53.0386 51.7384 53.0378 51.7355C51.587 53.3934 49.7992 54.7222 47.794 55.633C45.7887 56.5438 43.6123 57.0156 41.4103 57.0168C32.867 57.0168 25.9406 50.0846 25.9406 41.5339C25.9406 32.9833 32.8659 26.0499 41.4092 26.0499C43.5176 26.0524 45.6033 26.4861 47.5382 27.3244C49.4731 28.1627 51.2164 29.388 52.6611 30.925C54.5578 33.5672 57.3777 35.3992 60.5612 36.0575C59.024 19.2571 44.961 5.61756 27.8363 5.61756Z"
          fill="url(#paint2_linear_150_855)"
        />
        <path
          d="M63.1965 46.7413C61.2343 46.7439 59.2986 47.1959 57.5379 48.0628C55.7771 48.9297 54.238 50.1884 53.0384 51.7426C53.0391 51.7399 53.0391 51.7371 53.0384 51.7344C51.3321 53.6841 49.1641 55.1739 46.7331 56.0671C44.3022 56.9604 41.686 57.2285 39.1246 56.847C37.3913 61.4848 37.4043 66.5956 39.1612 71.2245C40.9181 75.8534 44.2987 79.6838 48.6714 82.0001C57.8101 80.3497 65.9035 75.6907 71.8902 69.0832C73.2016 67.8782 74.2487 66.4138 74.965 64.7827C75.6814 63.1516 76.0514 61.3893 76.0517 59.6075C76.0517 52.5017 70.2963 46.7413 63.1965 46.7413Z"
          fill="url(#paint3_linear_150_855)"
        />
        <path
          d="M41.2929 0C25.804 0 12.3055 8.53963 5.23987 21.1705C5.3324 33.7478 14.5598 44.1495 26.6092 46.0584C26.1624 44.5915 25.9359 43.0664 25.9373 41.5328C25.9373 32.9822 32.8636 26.0499 41.4069 26.0499C43.5153 26.0524 45.601 26.4861 47.5359 27.3244C49.4708 28.1627 51.2141 29.388 52.6588 30.925C52.7067 30.9917 52.7558 31.0573 52.8053 31.1229C55.3856 31.1378 55.9766 29.4053 55.9766 22.0519C55.9766 13.2069 51.4565 4.99302 44.6035 0.131743C43.5108 0.0450169 42.4067 0.00110246 41.2912 0H41.2929Z"
          fill="url(#paint4_linear_150_855)"
        />
        <path
          d="M76.0412 23.3952C76.0409 26.5972 74.8507 29.6847 72.702 32.0571C70.5534 34.4295 67.5998 35.9173 64.4159 36.2309C61.232 36.5446 58.0453 35.6618 55.4757 33.7542C52.9061 31.8466 51.1373 29.0506 50.5133 25.91C49.8893 22.7695 50.4547 19.5089 52.0996 16.7625C53.7445 14.0161 56.3513 11.9802 59.4128 11.0508C62.4744 10.1214 65.7719 10.3649 68.664 11.7341C71.5561 13.1032 73.836 15.5001 75.0603 18.4584C75.7079 20.0236 76.0412 21.7011 76.0412 23.3952Z"
          fill="#4E143F"
        />
      </g>
      <path
        d="M93.09 46.3164C93.09 49.3304 93.9293 51.0853 95.112 52.268C96.371 53.4889 97.9352 53.7941 99.385 53.7941C100.758 53.7941 102.361 53.4889 103.62 52.268C104.803 51.0853 105.604 49.3304 105.604 46.3164V45.7823C105.604 45.0192 104.993 44.4088 104.268 44.4088H103.162C102.399 44.4088 101.789 45.0192 101.789 45.7823V46.3164C101.789 47.6898 101.598 48.7199 101.14 49.3304C100.797 49.7119 100.11 50.0171 99.385 50.0171C97.7445 50.0171 96.9433 48.8725 96.9433 46.3164V35.5195C96.9433 32.9633 97.7826 31.8569 99.385 31.8569C100.949 31.8569 101.789 32.9633 101.789 35.5195V36.0536C101.789 36.8166 102.399 37.427 103.162 37.427H104.268C104.993 37.427 105.604 36.8166 105.604 36.0536V35.5195C105.604 32.6199 104.803 30.7124 103.582 29.5678C102.323 28.4233 100.797 28.0799 99.385 28.0799C97.9352 28.0799 96.4092 28.4233 95.1502 29.5678C93.9293 30.7124 93.09 32.6199 93.09 35.5195V46.3164Z"
        fill="white"
      />
      <path
        d="M112.123 29.4534C112.123 28.6903 111.474 28.0799 110.749 28.0799H109.681C108.918 28.0799 108.308 28.6903 108.308 29.4534V52.4206C108.308 53.1837 108.918 53.7941 109.681 53.7941H110.749C111.474 53.7941 112.123 53.1837 112.123 52.4206V29.4534Z"
        fill="white"
      />
      <path
        d="M127.283 46.0112C127.283 44.0273 126.749 42.4631 125.643 41.2804C125.757 41.1659 125.834 41.0896 125.948 40.9752C127.131 39.7925 127.551 37.8849 127.551 35.5195C127.551 30.4071 125.91 28.0417 121.217 28.0417H116.41C115.647 28.0417 115.037 28.6522 115.037 29.4152V52.3825C115.037 53.1455 115.647 53.756 116.41 53.756H117.479C118.203 53.756 118.814 53.1455 118.814 52.3825V43.0353H120.531C122.4 43.0353 123.468 44.1036 123.468 46.0112V52.3825C123.468 53.1455 124.079 53.756 124.842 53.756H125.91C126.673 53.756 127.283 53.1455 127.283 52.3825V46.0112ZM118.814 31.8569H121.217C123.201 31.8569 123.774 32.9252 123.774 35.5195C123.774 38.1138 122.667 39.182 120.531 39.182H118.814V31.8569Z"
        fill="white"
      />
      <path
        d="M156.379 51.3905C156.379 50.6275 155.769 50.0171 155.006 50.0171H149.321V29.4534C149.321 28.6903 148.71 28.0799 147.986 28.0799H146.879C146.116 28.0799 145.506 28.6903 145.506 29.4534V52.4206C145.506 53.1837 146.116 53.7941 146.879 53.7941H155.006C155.769 53.7941 156.379 53.1837 156.379 52.4206V51.3905Z"
        fill="white"
      />
      <path
        d="M160.167 28.0799C159.404 28.0799 158.793 28.6903 158.793 29.4534V52.4206C158.793 53.1837 159.404 53.7941 160.167 53.7941H168.407C169.17 53.7941 169.781 53.1837 169.781 52.4206V51.3905C169.781 50.6275 169.17 50.0171 168.407 50.0171H162.57V42.8064H167.377C168.14 42.8064 168.751 42.196 168.751 41.433V40.4029C168.751 39.6398 168.14 39.0294 167.377 39.0294H162.57V31.8569H168.407C169.17 31.8569 169.781 31.2465 169.781 30.4835V29.4534C169.781 28.6903 169.17 28.0799 168.407 28.0799H160.167Z"
        fill="white"
      />
      <path
        d="M171.331 46.3164C171.331 51.3142 173.429 53.756 177.626 53.756C181.67 53.756 183.921 51.4669 183.921 47.1939C183.921 43.4932 181.365 41.5474 178.847 39.6017H178.885C177.016 38.1519 175.146 36.664 175.146 34.7183C175.146 32.7344 176.024 31.8569 177.626 31.8569C179.305 31.8569 180.106 33.0015 180.106 35.5195V36.0536C180.106 36.8166 180.716 37.427 181.479 37.427H182.548C183.311 37.427 183.921 36.8166 183.921 36.0536V35.5195C183.921 30.6742 181.746 28.0417 177.626 28.0417C173.582 28.0417 171.331 30.5216 171.331 34.8327C171.331 38.6097 173.963 40.6699 176.481 42.6538V42.6157C178.351 44.0654 180.106 45.477 180.106 47.2702C180.106 49.2922 179.228 49.9789 177.626 49.9789C177.092 49.9789 176.443 49.9026 176.024 49.483C175.489 49.0251 175.146 48.1477 175.146 46.3164V45.8204C175.146 45.0574 174.498 44.447 173.773 44.447H172.704C171.941 44.447 171.331 45.0574 171.331 45.8204V46.3164Z"
        fill="white"
      />
      <path
        d="M143.129 46.3163C143.129 49.3303 142.289 51.0853 141.107 52.268C139.847 53.4888 138.283 53.794 136.834 53.794C135.46 53.794 133.858 53.4888 132.599 52.268C131.416 51.0853 130.615 49.3303 130.615 46.3163V45.7822C130.615 45.0192 131.225 44.4087 131.95 44.4087H133.057C133.82 44.4087 134.43 45.0192 134.43 45.7822V46.3163C134.43 47.6898 134.621 48.7199 135.079 49.3303C135.422 49.7118 136.109 50.017 136.834 50.017C138.474 50.017 139.275 48.8725 139.275 46.3163V35.5194C139.275 32.9632 138.436 31.8568 136.834 31.8568C135.269 31.8568 134.43 32.9632 134.43 35.5194V36.0535C134.43 36.8166 133.82 37.427 133.057 37.427H131.95C131.225 37.427 130.615 36.8166 130.615 36.0535V35.5194C130.615 32.6199 131.416 30.7123 132.637 29.5677C133.896 28.4232 135.422 28.0798 136.834 28.0798C138.283 28.0798 139.809 28.4232 141.068 29.5677C142.289 30.7123 143.129 32.6199 143.129 35.5194V46.3163Z"
        fill="#3CC1CA"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_150_855"
          x1="53.6139"
          x2="38.3541"
          y1="6.18086"
          y2="48.3006"
        >
          <stop stopColor="#4F254E" />
          <stop offset="1" stopColor="#B577AF" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint1_linear_150_855"
          x1="21.8732"
          x2="65.6003"
          y1="76.9509"
          y2="15.3303"
        >
          <stop stopColor="#6EBE9F" />
          <stop offset="0.51" stopColor="#53706E" />
          <stop offset="1" stopColor="#4E143F" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint2_linear_150_855"
          x1="23.2276"
          x2="36.2414"
          y1="3.863"
          y2="70.8997"
        >
          <stop stopColor="#E62879" />
          <stop offset="0.6" stopColor="#6FAEC4" />
          <stop offset="1" stopColor="#6CC3CB" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint3_linear_150_855"
          x1="37.1105"
          x2="75.6447"
          y1="73.7449"
          y2="54.4998"
        >
          <stop stopColor="#E84B49" />
          <stop offset="1" stopColor="#F29231" stopOpacity="0.99" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint4_linear_150_855"
          x1="-0.258874"
          x2="48.8003"
          y1="32.2259"
          y2="17.7977"
        >
          <stop stopColor="#E62879" />
          <stop offset="0.36" stopColor="#CC1B70" />
          <stop offset="1" stopColor="#561D53" />
        </linearGradient>
        <clipPath id="clip0_150_855">
          <rect fill="white" height="82.6583" width="76.1326" />
        </clipPath>
      </defs>
    </Wrapper>
  )
}
