import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/footer'
import { getAboutContent } from '@/sanity/sanity-utils'
import imgLogoAAA from '@/public/images/logos/AAA.png'
import imgLogoAAI from '@/public/images/logos/AAI.png'
import imgLogoABC from '@/public/images/logos/ABC.png'
import imgLogoGCA from '@/public/images/logos/GCA.png'
import imgLogoGIZ from '@/public/images/logos/GIZ.png'

export default async function About() {
  const content = await getAboutContent('about')

  return (
    <div className='relative pt-[125px]'>
      <div className='max-w-[960px] mx-auto mb-[100px]'>
        <h1 className='text-[60px] text-brand-green uppercase font-semibold tracking-wide leading-tight mb-10'>About The African Agriculture Adaptation<br />Tracking Tool</h1>
        <h4 className='text-[42px] text-grey-700 font-bold tracking-wide leading-tight'>Empowering African agriculture stakeholders with tools for tracking implementation and effectiveness of adaptation actions and enabling partnerships.</h4>
      </div>

      <div className='relative w-full mb-[100px]'>
        {content.heroImage && (
          <Image
            src={content.heroImage}
            alt={content.title}
            width={500}
            height={500}
            layout='responsive'
            objectFit='contain'
          />
        )}
      </div>

      <div className='mb-[100px]'>
        <h2 className='max-w-[960px] mx-auto text-[42px] text-grey-700 font-bold tracking-wide leading-tight mb-8'>Objectives</h2>

        <div className='max-w-[960px] mx-auto mb-16'>
          <h3 className='text-[24px] text-grey-700 font-bold tracking-wide leading-tight mb-3'>Map Actors</h3>
          <p className='text-[24px] text-grey-700 tracking-normal leading-[40px] mb-5'>We inventory organizations and actions to identify partnerships for advancing African agriculture adaptation.</p>
        </div>

        {/* <div id='callout-box' className='bg-off-white py-12 border-b border-t border-grey-400 mb-16'>
          <div className='max-w-[960px] mx-auto'>
            <h3 className='text-[24px] text-grey-500 font-bold tracking-wide leading-tight mb-3'>Lorem ipsum dolor sit amet</h3>
            <p className='text-[24px] text-grey-500 tracking-normal leading-[40px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div> */}

        <div className='max-w-[960px] mx-auto mb-24'>
          <h3 className='text-[24px] text-grey-700 font-bold tracking-wide leading-tight mb-3'>Metrics Mapping & Evaluation</h3>
          <p className='text-[24px] text-grey-700 tracking-normal leading-[40px] mb-5'>We operationalize <i>iceberg thinking</i> for agricultural adaptation tracking. That is, we provide accessible tools for stakeholders to put actions and metrics in context, simplifying their application of adaptation concepts and providing entry points for improving coherence and consistency of information. The preliminary tools released include sets of generic impact pathways relevant for major types of agricultural adaptation actions, creating strawpersons for stakeholders to modify and create adaptation rationales and impact pathways. Indicator lists that align to the impact pathways help narrow down from long lists to short lists of indicators allowing users to more quickly determine priorities. This first set of tools build on the rich history of developments in agricultural adaptation monitoring and evaluation and recent contributions to adaptation tracking thinking.</p>
        </div>

        <h2 className='max-w-[960px] mx-auto text-[42px] text-grey-700 font-bold tracking-wide leading-tight mb-5'>Partners</h2>

        <div className='max-w-[960px] mx-auto mb-20'>
          <h3 className='text-[24px] text-grey-700 font-bold tracking-wide leading-tight mb-3'>Implementation</h3>
          <p className='text-[24px] text-grey-700 tracking-normal leading-[40px] mb-5'>The African Agriculture Adaptation Tracking Tool is implemented through a collaboration between the Adaptation of African Agriculture Initiative (AAA) and the Alliance of Bioversity International and International Center on Tropical Agriculture (Alliance of Bioversity-CIAT). The project has benefited from the oversight of SDG-Action. Financial support has so far been provided by GIZ and the Global Center on Adaptation (GCA).</p>
        </div>

        <div className='max-w-[960px] mx-auto mb-24 flex justify-center flex-wrap items-center gap-20'>
          <Image
            src={imgLogoAAA}
            alt='Adaptation of African Agriculture Initiative logo'
            className='h-fit'
          />
          <Image
            src={imgLogoAAI}
            alt='AAI logo'
            className='h-fit'
          />
          <Image
            src={imgLogoABC}
            alt='ABC logo'
            className='h-fit'
          />
          <Image
            src={imgLogoGCA}
            alt='Global Center on Adaptation logo'
            className='h-fit'
          />
          <Image
            src={imgLogoGIZ}
            alt='GIZ logo'
            className='h-fit'
          />
        </div>

        <h2 className='max-w-[960px] mx-auto text-[42px] text-grey-700 font-bold tracking-wide leading-tight mb-5'>Methods and Sources</h2>

        <div className='max-w-[960px] mx-auto mb-16'>
          <h3 className='text-[24px] text-grey-700 font-bold tracking-wide leading-tight mb-3'>Identifying Actors and Actions</h3>
          <p className='text-[24px] text-grey-700 tracking-normal leading-[40px] mb-5'>A structured approach was employed utilizing two interconnected databases—one for actors and one for projects. Existing stakeholders maps were reviewed to identify key stakeholders in targeted countries, building the actors database. This database served as a foundation for identifying projects initiated by stakeholders. Project details were sourced from official websites, reports, or articles and collected through google forms. </p>
          <p className='text-[24px] text-grey-700 tracking-normal leading-[40px] mb-5'>These included partners, funders, budget, target value chains, beneficiaries, and specific methods implemented like on-farm adaptations (manure management, water harvesting, diversification, pest and disease management …) and beyond-farm adaptations (training, research, policy, finance …). Precise coordinates of the project locations were extracted as well to give a clear and detailed overview of each project’s scope.</p>
          <p className='text-[24px] text-grey-700 tracking-normal leading-[40px] mb-5'>As new projects were added, we identified new actors. This iterative process allows us to continually update the databases, and ensure the inclusion of as many projects as possible related to agricultural adaptations to a changing climate.</p>
        </div>

        <div className='max-w-[960px] mx-auto mb-24'>
          <h3 className='text-[24px] text-grey-700 font-bold tracking-wide leading-tight mb-3'>Defining Actions, Impact Pathways, and Indicators</h3>
          <p className='text-[24px] text-grey-700 tracking-normal leading-[40px] mb-5'>To define key adaptation actions, the approximately 80 investments listed in the 10 Climate-Smart Agriculture Investment Plans (CSAIPs) were classified into broad, distinct categories through a systematic analysis of the activities included. An impact pathway was drawn out for each broad category of investment based on the scientific literature and project documents. Candidate indicators for each impact pathway were identified from the CSAIPs and major indicator compilations, enabling the alignment of specific indicators with each impact pathway. The result was a streamlined and relevant set of actions, impact pathways, and indicators that can kickstart the development of improved adaptation tracking plans and implementation.</p>
        </div>

        <h2 className='max-w-[960px] mx-auto text-[42px] text-grey-700 font-bold tracking-wide leading-tight mb-5'>Data visualization</h2>

        <div className='max-w-[960px] mx-auto mb-16'>
          <h3 className='text-[24px] text-grey-700 font-bold tracking-wide leading-tight mb-3'>Project budgets</h3>
          <p className='text-[24px] text-grey-700 tracking-normal leading-[40px] mb-5'>Budgets are reported in various currencies. In this tool, budgets have been converted into two global standard currencies (USD and EUR) for comparison across projects. Currency exchange rates were last sourced from [source] on [date].</p>
          <p className='text-[24px] text-grey-700 tracking-normal leading-[40px] mb-5'>Some projects do not report a budget and therefore appear as ‘Unspecified’ in the tool. The total budget figures listed for Partners are sums of all known associated project budgets, meaning that the true total budget for that Partner’s projects may in fact be higher than what’s displayed if some of the budgets are unknown or lower when they are a part of projects with many partners.</p>
        </div>

        <div className='max-w-[960px] mx-auto mb-16'>
          <h3 className='text-[24px] text-grey-700 font-bold tracking-wide leading-tight mb-3'>Project beneficiaries</h3>
          <p className='text-[24px] text-grey-700 tracking-normal leading-[40px] mb-5'>Project beneficiary data is collected in two ways. Target Beneficiary types are frequently reported and appear in Project Detail views in the tool. Beneficiary counts, used in Project and Partner list views, are less commonly reported and have an associated Beneficiary Unit that is recorded separately from Target Beneficiary types. Note that Beneficiary Units may represent individual or multiple people, such as Individuals, Farmers, Households, and more. In the tool, any projects which include multiple-person Beneficiary Units are marked with a disclaimer.</p>
          <p className='text-[24px] text-grey-700 tracking-normal leading-[40px] mb-5'>The number and type of beneficiaries for a project are not always identifiable and may appear as ‘Unspecified’ in the tool. The Total Beneficiary counts listed for Partners are sums of all known associated project beneficiary counts, meaning that the true total beneficiary count for that Partner’s projects may in fact be higher than what’s displayed if some of the beneficiary counts are unknown.</p>
        </div>

        <div className='max-w-[960px] mx-auto mb-16'>
          <h3 className='text-[24px] text-grey-700 font-bold tracking-wide leading-tight mb-3'>Estimated project locations</h3>
          <p className='text-[24px] text-grey-700 tracking-normal leading-[40px] mb-5'>In some cases the precise location of a project was unidentifiable during data collection so an estimated location was used, such as a country or region centroid. Since multiple projects may share the same estimated coordinates, these overlapping marks have been jittered into rings around the estimated location in order to reduce obscured data points on the map and reveal concentrations of project locations.</p>
        </div>

        <div className='max-w-[960px] mx-auto mb-16'>
          <h3 className='text-[24px] text-grey-700 font-bold tracking-wide leading-tight mb-3'>Partner networks</h3>
          <p className='text-[24px] text-grey-700 tracking-normal leading-[40px] mb-5'>Projects may have multiple types of partners involved, including Primary, Funding, and Implementation, the lists of which may be incomplete, as data collection is ongoing. The partner networks in this tool visualize the known network for a single partner: all their known projects and all the known Primary Collaborators on those projects. These networks currently don’t include Funding or Implementation partners.</p>
        </div>

        <div className='max-w-[960px] mx-auto mb-[100px]'>
          <p className='text-[24px] text-grey-700 tracking-normal leading-[40px] mb-5'>The data visualization was designed and developed in partnership with <a href="https://periscopic.com/#!/" rel='noreferrer nofollow' target='_blank' className='underline hover:text-brand-green transition-colors'>Periscopic</a>.</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}