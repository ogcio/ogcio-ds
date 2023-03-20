import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'

export default {
  title: 'Layout/Superheader',
  parameters: {
    docs: {
      description: {
        component: 'The GOV.IE superheader.',
      },
    },
  },
  // argTypes: {},
}

const Template = (args) => {
  const header = document.createElement('header')
  header.innerHTML = `
  <header
  role="banner"
  class="gem-c-layout-super-navigation-header"
  data-module="gem-track-click ga4-event-tracker ga4-link-tracker"
>
  <div class="gem-c-layout-super-navigation-header__container govie-clearfix">
    <div class="govie-width-container">
      <div class="gem-c-layout-super-navigation-header__header-logo">
        <a
          class="govie-header__link govie-header__link--homepage"
          href="https://www.gov.uk"
          id="logo"
          title="Go to the GOV.UK homepage"
        >
          <span class="govie-header__logotype">
            <!--[if gt IE 8]><!-->
            <svg
              aria-hidden="true"
              class="govie-header__logotype-crown gem-c-layout-super-navigation-header__logotype-crown"
              focusable="false"
              height="30"
              viewBox="0 0 132 97"
              width="36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25 30.2c3.5 1.5 7.7-.2 9.1-3.7 1.5-3.6-.2-7.8-3.9-9.2-3.6-1.4-7.6.3-9.1 3.9-1.4 3.5.3 7.5 3.9 9zM9 39.5c3.6 1.5 7.8-.2 9.2-3.7 1.5-3.6-.2-7.8-3.9-9.1-3.6-1.5-7.6.2-9.1 3.8-1.4 3.5.3 7.5 3.8 9zM4.4 57.2c3.5 1.5 7.7-.2 9.1-3.8 1.5-3.6-.2-7.7-3.9-9.1-3.5-1.5-7.6.3-9.1 3.8-1.4 3.5.3 7.6 3.9 9.1zm38.3-21.4c3.5 1.5 7.7-.2 9.1-3.8 1.5-3.6-.2-7.7-3.9-9.1-3.6-1.5-7.6.3-9.1 3.8-1.3 3.6.4 7.7 3.9 9.1zm64.4-5.6c-3.6 1.5-7.8-.2-9.1-3.7-1.5-3.6.2-7.8 3.8-9.2 3.6-1.4 7.7.3 9.2 3.9 1.3 3.5-.4 7.5-3.9 9zm15.9 9.3c-3.6 1.5-7.7-.2-9.1-3.7-1.5-3.6.2-7.8 3.7-9.1 3.6-1.5 7.7.2 9.2 3.8 1.5 3.5-.3 7.5-3.8 9zm4.7 17.7c-3.6 1.5-7.8-.2-9.2-3.8-1.5-3.6.2-7.7 3.9-9.1 3.6-1.5 7.7.3 9.2 3.8 1.3 3.5-.4 7.6-3.9 9.1zM89.3 35.8c-3.6 1.5-7.8-.2-9.2-3.8-1.4-3.6.2-7.7 3.9-9.1 3.6-1.5 7.7.3 9.2 3.8 1.4 3.6-.3 7.7-3.9 9.1zM69.7 17.7l8.9 4.7V9.3l-8.9 2.8c-.2-.3-.5-.6-.9-.9L72.4 0H59.6l3.5 11.2c-.3.3-.6.5-.9.9l-8.8-2.8v13.1l8.8-4.7c.3.3.6.7.9.9l-5 15.4v.1c-.2.8-.4 1.6-.4 2.4 0 4.1 3.1 7.5 7 8.1h.2c.3 0 .7.1 1 .1.4 0 .7 0 1-.1h.2c4-.6 7.1-4.1 7.1-8.1 0-.8-.1-1.7-.4-2.4V34l-5.1-15.4c.4-.2.7-.6 1-.9zM66 92.8c16.9 0 32.8 1.1 47.1 3.2 4-16.9 8.9-26.7 14-33.5l-9.6-3.4c1 4.9 1.1 7.2 0 10.2-1.5-1.4-3-4.3-4.2-8.7L108.6 76c2.8-2 5-3.2 7.5-3.3-4.4 9.4-10 11.9-13.6 11.2-4.3-.8-6.3-4.6-5.6-7.9 1-4.7 5.7-5.9 8-.5 4.3-8.7-3-11.4-7.6-8.8 7.1-7.2 7.9-13.5 2.1-21.1-8 6.1-8.1 12.3-4.5 20.8-4.7-5.4-12.1-2.5-9.5 6.2 3.4-5.2 7.9-2 7.2 3.1-.6 4.3-6.4 7.8-13.5 7.2-10.3-.9-10.9-8-11.2-13.8 2.5-.5 7.1 1.8 11 7.3L80.2 60c-4.1 4.4-8 5.3-12.3 5.4 1.4-4.4 8-11.6 8-11.6H55.5s6.4 7.2 7.9 11.6c-4.2-.1-8-1-12.3-5.4l1.4 16.4c3.9-5.5 8.5-7.7 10.9-7.3-.3 5.8-.9 12.8-11.1 13.8-7.2.6-12.9-2.9-13.5-7.2-.7-5 3.8-8.3 7.1-3.1 2.7-8.7-4.6-11.6-9.4-6.2 3.7-8.5 3.6-14.7-4.6-20.8-5.8 7.6-5 13.9 2.2 21.1-4.7-2.6-11.9.1-7.7 8.8 2.3-5.5 7.1-4.2 8.1.5.7 3.3-1.3 7.1-5.7 7.9-3.5.7-9-1.8-13.5-11.2 2.5.1 4.7 1.3 7.5 3.3l-4.7-15.4c-1.2 4.4-2.7 7.2-4.3 8.7-1.1-3-.9-5.3 0-10.2l-9.5 3.4c5 6.9 9.9 16.7 14 33.5 14.8-2.1 30.8-3.2 47.7-3.2z"
                fill="currentColor"
                fill-rule="evenodd"
              ></path>
            </svg>
            <!--<![endif]-->
            <!--[if IE 8]>
              <img
                src="/assets/static/govie-logotype-crown-66ad9a9b8fca42cf0ba18979eef6afc2e8056d5f158ca9b27ce9afdf852aae87.png"
                alt=""
                class="govie-header__logotype-crown-fallback-image"
                width="36"
                height="32"
              />
            <![endif]-->
            <span class="govie-header__logotype-text"> GOV.UK </span>
          </span>
        </a>
      </div>
    </div>
    <nav
      aria-labelledby="super-navigation-menu-heading"
      class="gem-c-layout-super-navigation-header__content js-module-initialised"
      data-module="super-navigation-mega-menu"
    >
      <h2 id="super-navigation-menu-heading" class="govie-visually-hidden">
        Navigation menu
      </h2>

      <div
        class="govie-width-container gem-c-layout-super-navigation-header__button-width-container"
      >
        <div class="gem-c-layout-super-navigation-header__button-container">
          <div class="gem-c-layout-super-navigation-header__navigation-item">
            <a
              class="gem-c-layout-super-navigation-header__navigation-item-link"
              href="/browse"
              hidden="hidden"
            >
              <span
                class="gem-c-layout-super-navigation-header__navigation-item-link-inner"
              >
                Menu
              </span>
            </a>
            <button
              aria-controls="super-navigation-menu-d18cb29e"
              aria-expanded="false"
              aria-label="Show navigation menu"
              class="gem-c-layout-super-navigation-header__navigation-top-toggle-button"
              data-text-for-hide="Hide navigation menu"
              data-text-for-show="Show navigation menu"
              data-toggle-desktop-group="top"
              data-toggle-mobile-group="top"
              type="button"
            >
              <span
                class="gem-c-layout-super-navigation-header__navigation-top-toggle-button-inner"
                >Menu</span
              >
            </button>

          </div>

          <div class="gem-c-layout-super-navigation-header__search-item">
            <button
              aria-controls="super-search-menu"
              aria-expanded="false"
              aria-label="Show search menu"
              class="gem-c-layout-super-navigation-header__search-toggle-button"
              data-text-for-hide="Hide search menu"
              data-text-for-show="Show search menu"
              data-toggle-mobile-group="top"
              data-toggle-desktop-group="top"
              id="super-search-menu-toggle"
              type="button"
            >
              <span class="govie-visually-hidden"> Search GOV.UK </span>

              <svg
                class="gem-c-layout-super-navigation-header__search-toggle-button-link-icon"
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <circle
                  cx="12.0161"
                  cy="11.0161"
                  r="8.51613"
                  stroke="currentColor"
                  stroke-width="3"
                ></circle>
                <line
                  x1="17.8668"
                  y1="17.3587"
                  x2="26.4475"
                  y2="25.9393"
                  stroke="currentColor"
                  stroke-width="3"
                ></line>
              </svg>
              <span
                aria-hidden="true"
                class="gem-c-layout-super-navigation-header__navigation-top-toggle-close-icon"
                focusable="false"
              >
                x
              </span>
            </button>

            <a
              class="gem-c-layout-super-navigation-header__search-item-link"
              href="/search"
              hidden="hidden"
            >
              <span class="govie-visually-hidden"> Search GOV.UK </span>

              <svg
                class="gem-c-layout-super-navigation-header__search-item-link-icon"
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <circle
                  cx="12.0161"
                  cy="11.0161"
                  r="8.51613"
                  stroke="currentColor"
                  stroke-width="3"
                ></circle>
                <line
                  x1="17.8668"
                  y1="17.3587"
                  x2="26.4475"
                  y2="25.9393"
                  stroke="currentColor"
                  stroke-width="3"
                ></line>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div
        id="super-navigation-menu-d18cb29e"
        class="gem-c-layout-super-navigation-header__navigation-dropdown-menu"
        hidden="hidden"
      >
        <div class="govie-width-container">
          <div
            class="govie-grid-row gem-c-layout-super-navigation-header__navigation-items"
          >
            <div
              class="govie-grid-column-two-thirds-from-desktop gem-c-layout-super-navigation-header__column--topics"
            >
              <h3
                class="govie-heading-m gem-c-layout-super-navigation-header__column-header"
              >
                Topics
              </h3>
              <ul
                class="gem-c-layout-super-navigation-header__navigation-second-items gem-c-layout-super-navigation-header__navigation-second-items--topics"
              >
                <li
                  class="gem-c-layout-super-navigation-header__dropdown-list-item"
                >
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__navigation-second-item-link"
                    href="/browse/benefits"
                    >Benefits</a
                  >
                </li>
                <li
                  class="gem-c-layout-super-navigation-header__dropdown-list-item"
                >
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__navigation-second-item-link"
                    href="/browse/births-deaths-marriages"
                    >Births, death, marriages and care</a
                  >
                </li>
                <li
                  class="gem-c-layout-super-navigation-header__dropdown-list-item"
                >
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__navigation-second-item-link"
                    href="/browse/business"
                    >Business and self-employed</a
                  >
                </li>
                <li
                  class="gem-c-layout-super-navigation-header__dropdown-list-item"
                >
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__navigation-second-item-link"
                    href="/browse/childcare-parenting"
                    >Childcare and parenting</a
                  >
                </li>
                <li
                  class="gem-c-layout-super-navigation-header__dropdown-list-item"
                >
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__navigation-second-item-link"
                    href="/browse/citizenship"
                    >Citizenship and living in the UK</a
                  >
                </li>
                <li
                  class="gem-c-layout-super-navigation-header__dropdown-list-item"
                >
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__navigation-second-item-link"
                    href="/cost-of-living"
                    >Cost of living support</a
                  >
                </li>
                <li
                  class="gem-c-layout-super-navigation-header__dropdown-list-item"
                >
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__navigation-second-item-link"
                    href="/browse/justice"
                    >Crime, justice and the law</a
                  >
                </li>
                <li
                  class="gem-c-layout-super-navigation-header__dropdown-list-item"
                >
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__navigation-second-item-link"
                    href="/browse/disabilities"
                    >Disabled people</a
                  >
                </li>
                <li
                  class="gem-c-layout-super-navigation-header__dropdown-list-item"
                >
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__navigation-second-item-link"
                    href="/browse/driving"
                    >Driving and transport</a
                  >
                </li>
                <li
                  class="gem-c-layout-super-navigation-header__dropdown-list-item"
                >
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__navigation-second-item-link"
                    href="/browse/education"
                    >Education and learning</a
                  >
                </li>
                <li
                  class="gem-c-layout-super-navigation-header__dropdown-list-item"
                >
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__navigation-second-item-link"
                    href="/browse/employing-people"
                    >Employing people</a
                  >
                </li>
                <li
                  class="gem-c-layout-super-navigation-header__dropdown-list-item"
                >
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__navigation-second-item-link"
                    href="/browse/environment-countryside"
                    >Environment and countryside</a
                  >
                </li>
                <li
                  class="gem-c-layout-super-navigation-header__dropdown-list-item"
                >
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__navigation-second-item-link"
                    href="/browse/housing-local-services"
                    >Housing and local services</a
                  >
                </li>
                <li
                  class="gem-c-layout-super-navigation-header__dropdown-list-item"
                >
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__navigation-second-item-link"
                    href="/browse/tax"
                    >Money and tax</a
                  >
                </li>
                <li
                  class="gem-c-layout-super-navigation-header__dropdown-list-item"
                >
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__navigation-second-item-link"
                    href="/browse/abroad"
                    >Passports, travel and living abroad</a
                  >
                </li>
                <li
                  class="gem-c-layout-super-navigation-header__dropdown-list-item"
                >
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__navigation-second-item-link"
                    href="/browse/visas-immigration"
                    >Visas and immigration</a
                  >
                </li>
                <li
                  class="gem-c-layout-super-navigation-header__dropdown-list-item"
                >
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__navigation-second-item-link"
                    href="/browse/working"
                    >Working, jobs and pensions</a
                  >
                </li>
              </ul>
            </div>

            <div
              class="govie-grid-column-one-third-from-desktop gem-c-layout-super-navigation-header__column--government-activity"
            >
              <h3
                class="govie-heading-m gem-c-layout-super-navigation-header__column-header"
              >
                Government activity
              </h3>
              <ul
                class="gem-c-layout-super-navigation-header__navigation-second-items gem-c-layout-super-navigation-header__navigation-second-items--government-activity"
              >
                <li
                  class="gem-c-layout-super-navigation-header__dropdown-list-item"
                >
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__navigation-second-item-link gem-c-layout-super-navigation-header__navigation-second-item-link--with-description"
                    href="/government/organisations"
                    >Departments</a
                  >
                  <p
                    class="gem-c-layout-super-navigation-header__navigation-second-item-description"
                  >
                    Departments, agencies and public bodies
                  </p>
                </li>
                <li
                  class="gem-c-layout-super-navigation-header__dropdown-list-item"
                >
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__navigation-second-item-link gem-c-layout-super-navigation-header__navigation-second-item-link--with-description"
                    href="/search/news-and-communications"
                    >News</a
                  >
                  <p
                    class="gem-c-layout-super-navigation-header__navigation-second-item-description"
                  >
                    News stories, speeches, letters and notices
                  </p>
                </li>
                <li
                  class="gem-c-layout-super-navigation-header__dropdown-list-item"
                >
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__navigation-second-item-link gem-c-layout-super-navigation-header__navigation-second-item-link--with-description"
                    href="/search/guidance-and-regulation"
                    >Guidance and regulation</a
                  >
                  <p
                    class="gem-c-layout-super-navigation-header__navigation-second-item-description"
                  >
                    Detailed guidance, regulations and rules
                  </p>
                </li>
                <li
                  class="gem-c-layout-super-navigation-header__dropdown-list-item"
                >
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__navigation-second-item-link gem-c-layout-super-navigation-header__navigation-second-item-link--with-description"
                    href="/search/research-and-statistics"
                    >Research and statistics</a
                  >
                  <p
                    class="gem-c-layout-super-navigation-header__navigation-second-item-description"
                  >
                    Reports, analysis and official statistics
                  </p>
                </li>
                <li
                  class="gem-c-layout-super-navigation-header__dropdown-list-item"
                >
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__navigation-second-item-link gem-c-layout-super-navigation-header__navigation-second-item-link--with-description"
                    href="/search/policy-papers-and-consultations"
                    >Policy papers and consultations</a
                  >
                  <p
                    class="gem-c-layout-super-navigation-header__navigation-second-item-description"
                  >
                    Consultations and strategy
                  </p>
                </li>
                <li
                  class="gem-c-layout-super-navigation-header__dropdown-list-item"
                >
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__navigation-second-item-link gem-c-layout-super-navigation-header__navigation-second-item-link--with-description"
                    href="/search/transparency-and-freedom-of-information-releases"
                    >Transparency</a
                  >
                  <p
                    class="gem-c-layout-super-navigation-header__navigation-second-item-description"
                  >
                    Data, Freedom of Information releases and corporate reports
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        id="super-search-menu"
        hidden="hidden"
        class="gem-c-layout-super-navigation-header__navigation-dropdown-menu"
      >
        <div
          class="govie-width-container gem-c-layout-super-navigation-header__search-container gem-c-layout-super-navigation-header__search-items"
        >
          <h3 class="govie-visually-hidden">Search</h3>
          <div class="govie-grid-row">
            <div class="govie-grid-column-full">
              <form
                class="gem-c-layout-super-navigation-header__search-form"
                id="search"
                data-module="ga4-form-tracker"
                action="/search"
                method="get"
                role="search"
                aria-label="Site-wide"
              >
                <div
                  class="gem-c-search govie-!-display-none-print gem-c-search--large gem-c-search--on-white gem-c-search--separate-label"
                  data-module="gem-toggle-input-class-on-focus"
                >
                  <label
                    for="search-main-0815e317"
                    class="govie-label govie-label--m"
                    >Search GOV.UK</label
                  >
                  <div class="gem-c-search__item-wrapper">
                    <input
                      enterkeyhint="search"
                      class="gem-c-search__item gem-c-search__input js-class-toggle"
                      id="search-main-0815e317"
                      name="q"
                      title="Search"
                      type="search"
                      value=""
                    />
                    <div
                      class="gem-c-search__item gem-c-search__submit-wrapper"
                    >
                      <button
                        class="gem-c-search__submit"
                        type="submit"
                        data-module="gem-track-click"
                        enterkeyhint="search"
                      >
                        Search

                        <svg
                          class="gem-c-search__icon"
                          width="27"
                          height="27"
                          viewBox="0 0 27 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <circle
                            cx="12.0161"
                            cy="11.0161"
                            r="8.51613"
                            stroke="currentColor"
                            stroke-width="3"
                          ></circle>
                          <line
                            x1="17.8668"
                            y1="17.3587"
                            x2="26.4475"
                            y2="25.9393"
                            stroke="currentColor"
                            stroke-width="3"
                          ></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="govie-grid-row">
            <div class="govie-grid-column-full">
              <h3 class="govie-heading-m">Popular on GOV.UK</h3>
              <ul class="govie-list">
                <li class="gem-c-layout-super-navigation-header__popular-item">
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__popular-link"
                    href="/check-benefits-financial-support"
                    >Check benefits and financial support you can get</a
                  >
                </li>
                <li class="gem-c-layout-super-navigation-header__popular-item">
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__popular-link"
                    href="/guidance/getting-the-energy-bills-support-scheme-discount"
                    >Find out about the Energy Bills Support Scheme</a
                  >
                </li>
                <li class="gem-c-layout-super-navigation-header__popular-item">
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__popular-link"
                    href="/find-a-job"
                    >Find a job</a
                  >
                </li>
                <li class="gem-c-layout-super-navigation-header__popular-item">
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__popular-link"
                    href="/coronavirus"
                    >Coronavirus (COVID-19)</a
                  >
                </li>
                <li class="gem-c-layout-super-navigation-header__popular-item">
                  <a
                    class="govie-link gem-c-layout-super-navigation-header__popular-link"
                    href="/sign-in-universal-credit"
                    >Universal Credit account: sign in</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</header> 
  `

  return beautifyHtmlNode(header)
}

export const Default = Template.bind({})
Default.args = {}
