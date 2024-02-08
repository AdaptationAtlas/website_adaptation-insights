import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/footer'
import { getToolsContent } from '@/lib/sanity-utils'

export default async function Tools() {
  const content = await getToolsContent('tools')

  return (
    <div className='relative pt-[80px] md:pt-[125px]'>
      <div className='max-w-[960px] mx-5 lg:mx-auto mb-12 md:mb-[100px]'>
        <h1 className='text-2xl md:text-[60px] text-brand-green uppercase font-semibold tracking-wide leading-tight mb-5 md:mb-10'>Tools</h1>
        <h4 className='text-2xl md:text-[42px] text-grey-700 font-bold tracking-wide leading-tight'>The development of comprehensive tracking plans is vital for evaluating adaptation effectiveness.</h4>
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
            className='hidden md:block'
          />
        )}
        {content.heroImageMobile && (
          <Image
            src={content.heroImageMobile}
            alt={content.title}
            width={500}
            height={500}
            layout='responsive'
            objectFit='contain'
            className='block md:hidden'
          />
        )}
      </div>

      <div className='mb-[100px]'>

        <div className='max-w-[960px] mx-5 lg:mx-auto mb-10 md:mb-16'>
          <p className='text-[18px] md:text-[24px] text-grey-700 tracking-normal leading-[30px] md:leading-[40px] mb-5'>Adaptation tracking is an essential component of climate change responses. It enables organizations, governments, and communities to assess progress in implementing adaptation measures and their effectiveness, ensuring that actions lead to tangible benefits and increased resilience. Traditional adaptation monitoring and evaluation (M&E) approaches focus on assessing implementation and effects of isolated projects or intervention. Tracking adaptation involves assessing progress and effectiveness of adaptation across scales – communities, projects, programs, sector, national – and over time.</p>
          <p className='text-[18px] md:text-[24px] text-grey-700 tracking-normal leading-[30px] md:leading-[40px] mb-5'>There are many important considerations for adaptation tracking, often overlooked. Here we offer some practical tools to help users improve their approaches to track adaptation: creating impact pathways and matching indicators to these pathways.</p>
        </div>

        <div className='max-w-[960px] mx-5 lg:mx-auto mb-10 md:mb-16'>
          <h3 className='text-[18px] md:text-[24px] text-grey-700 font-bold tracking-wide leading-normal mb-3'>Creating Impact Pathways: The Foundation of Adaptation Tracking</h3>
          <p className='text-[18px] md:text-[24px] text-grey-700 tracking-normal leading-[30px] md:leading-[40px] mb-5'>The creation of impact pathways is the first fundamental step in the adaptation tracking process. These pathways serve as comprehensive roadmaps that delineate how adaptation actions are expected to lead to specific outcomes and long-term impacts. By outlining the sequence of events from actions to effects, impact pathways provide a structured visualization of the vision and the means to achieve it.</p>
        </div>

        <div id='callout-box' className='bg-off-white py-8 md:py-12 border-b border-t border-grey-400 mb-10 md:mb-16'>
          <div className='max-w-[960px] mx-5 lg:mx-auto'>
            <h3 className='text-[18px] md:text-[24px] text-grey-500 font-bold tracking-wide leading-normal mb-3'>Impact Pathways and Theories of Change</h3>
            <p className='text-[18px] md:text-[24px] text-grey-500 tracking-normal leading-[30px] md:leading-[40px]'>The terms “theories of change” and “impact pathways” are closely related and often used interchangeably. Both concepts aim to provide a roadmap for achieving desired goals, articulating relationships between different aspects of any adaptation initiative: challenges, actions, results, outcomes, and impacts. We choose the term impact pathway to denote a schematic depiction of the rationale for adaptation (i.e., the climate hazards or risks), the envisioned results, outcomes and impacts, as well as the strategic actions to achieve them. Regardless of the terminology chosen, whether the user opts for an in-depth exploration of mapping assumption and hypotheses, the essence remains the same. Both concepts require a clear articulation of the vision for moving from status-quo to a desired state of enhanced resilience, reduced vulnerability, and enhanced adaptive capacity.</p>
          </div>
        </div>

        <div className='max-w-[960px] mx-5 lg:mx-auto mb-10 md:mb-16'>
          <p className='text-[18px] md:text-[24px] text-grey-700 tracking-normal leading-[30px] md:leading-[40px] mb-5'>In an adaptation context, impact pathways begin with the identification of climate hazards. This step sets the rationale for adaptation, outlining why adaptation is needed. Climate hazards might range from increase in frequency and magnitude of extreme events such as drought and floods, to incremental changes in temperature, variable precipitation, etc. The adaptation rationale is critical throughout the tracking process, emphasizing how each step contributes to building resilience and reducing vulnerability to climate change.</p>
          <p className='text-[18px] md:text-[24px] text-grey-700 tracking-normal leading-[30px] md:leading-[40px] mb-5'>Next, the impact pathway continues with a clear definition of adaptation actions, which can range from policy implementation to community-based interventions. The next stage in the pathway is the identification of immediate outputs and subsequent outcomes and impacts. The goal is to illustrate the flow of effects leading to the desired impact, which, in the context of climate adaptation, is increased resilience, enhanced adaptive capacity, and reduced vulnerability to climate change.</p>
          <p className='text-[18px] md:text-[24px] text-grey-700 tracking-normal leading-[30px] md:leading-[40px] mb-5'>To lower the barrier to creating these pathways, <a href="https://drive.google.com/drive/folders/1C9UrD_Up4E7BiiHvhzfQ76eew_9AmBrj" target='_blank' rel='noreferrer nofollow' className='underline hover:text-brand-green transition-colors'>generic frameworks</a> are provided. They are preliminary models offered as a starting point, which organizations can then refine and customize to fit their specific contexts. These impact pathways are not intended to be definitive. In fact, for any specific project they are incorrect. Rather, they are designed to be modified and iterated upon. By starting with a basic structure, organizations can save time and resources, quickly advancing to a tailored pathway that captures the nuances of their unique adaptation challenges and goals.</p>
          <p className='text-[18px] md:text-[24px] text-grey-700 tracking-normal leading-[30px] md:leading-[40px] mb-5'>An initial set of impact pathways has been developed, each tailored to specific types of adaptation actions. These nine pathways have been drawn from the major types of adaptation action outlined in the more than 100 projects described in the ten Climate-Smart Agriculture Investment Plans (CSAIPs). By analyzing these comprehensive national plans, common actions that drive adaptation forward were identified and form the basis of this exemplar set. The idea is simple, providing impact pathways that match to likely activities being planned versus providing more generic or out of context , makes the process more accessible.</p>
        </div>

        <div className='max-w-[960px] mx-5 lg:mx-auto mb-10 md:mb-16'>
          <h3 className='text-[18px] md:text-[24px] text-grey-700 font-bold tracking-wide leading-normal mb-3'>Matching Indicators to Impact Pathways: A Critical Step for Adaptation Tracking</h3>
          <p className='text-[18px] md:text-[24px] text-grey-700 tracking-normal leading-[30px] md:leading-[40px] mb-5'>Once an impact pathway is established, the next critical step is matching appropriate indicators to each element of the pathway. Indicators are makers that provide evidence of progress and effectiveness of adaptation actions. What makes an indicator an adaptation tracking indicator is its ability to be grounded within an adaptation context, ensuring that it provides  meaningful insights into the progress of adaptation efforts. To do so, we use the impact pathway as an entry point to design relevant indicators.</p>
          <p className='text-[18px] md:text-[24px] text-grey-700 tracking-normal leading-[30px] md:leading-[40px] mb-5'>Selecting the right indicators is a nuanced process that requires a balance between the specificity of the project and the universal applicability of the indicators, especially if one of the priorities is to compare data across projects or scales (i.e., aggregation). The indicators must be sensitive enough to detect progress (i.e., actions) and changes at different levels - from immediate results to long-term impacts. They should also cover various dimensions of social-ecological systems, including economic, social, and ecological aspects of adaptation.</p>
          <p className='text-[18px] md:text-[24px] text-grey-700 tracking-normal leading-[30px] md:leading-[40px] mb-5'>To aid in this process, a <a href="https://drive.google.com/drive/folders/1B4_GL_mRWpKP8lRh-LoNGSFXjOVwB9Sr" target='_blank' rel='noreferrer nofollow' className='underline hover:text-brand-green transition-colors'>repository of indicators</a> has been developed. This has been compiled from multiple data sources, such as donor project frameworks, investment M&E plans, or national adaptation systems, among others. The repository offers a range of indicators matched to different stages and elements of select adaptation impact pathways. While the repository is not comprehensive, as some elements of some impact pathways may not be covered, it provides a starting point for organizations to identify what is most relevant to their specific adaptation tracking needs.</p>
          <p className='text-[18px] md:text-[24px] text-grey-700 tracking-normal leading-[30px] md:leading-[40px] mb-5'>In conclusion, the meticulous process of creating impact pathways and matching indicators is vital for effective adaptation tracking. It allows for a systematic approach to measure the progress of adaptation actions, ensuring that every step taken is a stride toward building resilience and mitigating the impacts of climate change. Through this dual process, organizations can navigate the complexities of adaptation tracking and contribute to the global goal of a sustainable and resilient future.</p>
        </div>

        <div id='callout-box' className='bg-off-white py-8 md:py-12 border-b border-t border-grey-400 mb-10 md:mb-16'>
          <div className='max-w-[960px] mx-5 lg:mx-auto'>
            <h3 className='text-[18px] md:text-[24px] text-grey-500 font-bold tracking-wide leading-normal mb-3'>The role of stakeholders in consolidating the impact pathway</h3>
            <p className='text-[18px] md:text-[24px] text-grey-500 tracking-normal leading-[30px] md:leading-[40px]'>Engaging stakeholders in the validation and enrichment of the impact pathway is paramount for ensuring effectiveness and relevance of any adaptation tracking effort. With their diverse perspectives and expertise, stakeholders can bring valuable insights to enhance the robustness of the pathway. By involving them in the validation process, the likelihood of overlooking critical elements is significantly reduced, and the resulting pathway becomes a more accurate reflection of the complex dynamics involved in adaptation efforts. Furthermore, stakeholder engagement fosters a sense of ownership and commitment, aligning the pathway with the priorities and needs of those directly involved in or affected by adaptation initiatives. Engaging stakeholders can take various forms, including workshops, consultations, and feedback sessions, creating a collaborative environment that maximizes the collective intelligence and expertise of all involved parties. This inclusive approach not only strengthens the impact pathway but also contributes to the overall success and sustainability of adaptation tracking endeavors.</p>
          </div>
        </div>

        <div className='max-w-[960px] mx-5 lg:mx-auto mb-[100px]'>
          <h3 className='text-[18px] md:text-[24px] text-grey-700 font-bold tracking-wide leading-normal mb-3'>From Impact Pathways and Indicators to Comprehensive Tracking Plans</h3>
          <p className='text-[18px] md:text-[24px] text-grey-700 tracking-normal leading-[30px] md:leading-[40px] mb-5'>While defining indicators is a critical step in adaptation tracking, the journey doesn’t end there. Comprehensive tracking plans are needed to translate indicators into valuable data and insights on progress and effectiveness.</p>
          <p className='text-[18px] md:text-[24px] text-grey-700 tracking-normal leading-[30px] md:leading-[40px] mb-5'>First, adaptation tracking plans require assessments of available data systems, to capitalize on existing efforts to collect and synthesize adaptation data. A thorough analysis and follow-up stakeholder consultations can reveal multiple other systems and help to create a comprehensive catalogue of relevant datasets. This form the basis of subsequent definition of data infrastructure, roles, responsibilities, and the collaborative dynamics necessary for successful adaptation tracking.</p>
          <p className='text-[18px] md:text-[24px] text-grey-700 tracking-normal leading-[30px] md:leading-[40px] mb-5'>The data infrastructure is central to ensure robust and scalable data storage systems. The infrastructure should not only be capable of collecting and storing relevant data but should also be designed for interoperability and ease of access by various stakeholders. The integration and analysis of data across different platforms and sources are crucial for a nuanced understanding of adaptation impacts.</p>
          <p className='text-[18px] md:text-[24px] text-grey-700 tracking-normal leading-[30px] md:leading-[40px] mb-5'>Clearly defined roles and responsibilities form the backbone of effective adaptation tracking. Stakeholders, ranging from local community members to international organizations, must have clearly delineated roles. This clarity helps in ensuring accountability and fosters a sense of ownership among all parties involved.</p>
          <p className='text-[18px] md:text-[24px] text-grey-700 tracking-normal leading-[30px] md:leading-[40px] mb-5'>Moreover, the tracking plan requires mechanisms for regular review and updates. Adaptation to climate change is a dynamic process, and the strategies and tools used for tracking need to evolve in response to new insights and changing circumstances.</p>
          <p className='text-[18px] md:text-[24px] text-grey-700 tracking-normal leading-[30px] md:leading-[40px] mb-5'>In essence, the development of comprehensive tracking plans is vital for the success of adaptation tracking efforts. By encompassing detailed analysis of data systems, role clarity, and collaborative frameworks, these plans ensure that adaptation strategies are not only implemented effectively but are also continuously refined and optimized.</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}