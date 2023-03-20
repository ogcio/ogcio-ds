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
          id="logo"
          title="Go to the gov.ie homepage"
        >
          <span class="govie-header__logotype">
            <img id="logo-image" src="./@ogcio/assets/images/logo-full.png" class="govie-header__logotype-fallback-image">
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
