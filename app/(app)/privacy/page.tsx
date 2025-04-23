"use client"

import { motion } from "framer-motion";
import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <main className="w-screen min-h-screen bg-black py-6">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
        <nav className="w-full pb-2 sm:pb-4 sm:pt-4 relative">
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center relative z-50">
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-2xl font-semibold"
                style={{
                  background: 'linear-gradient(180deg, #000000 0%, #4E4A46 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
                href="/"
              >
                <Image src="/images/icons/icon-light.svg" alt="Lunark AI" width={256} height={256} className='w-12 h-12 object-contain' />
              </motion.a>
            </div>
          </div>
        </nav>
        <div className="max-w-4xl mx-auto mt-12">
          <h1 className="text-2xl font-semibold mb-8">Privacy Policy</h1>
          <section className="mb-8">
            <p>
              Lunark AI is your blockchain companion powered by dual intelligence - combining a conversational assistant that speaks your language with an autonomous agent that makes things happen. It turns complex blockchain operations into simple conversations, handling all the technical details while you focus on what matters.
              <br/><br/>
              This Privacy Policy explains how we collect, use, disclose, and process your personal data when you use our website and other places where Lunark AI may act as a data controller and link to this Privacy Policy—for example, when you interact with Lunarkai.org or other products as a consumer for personal use ("Services") or when Lunark AI operates and provides our commercial customers and their end users with access to our commercial products.
              <br/><br/>
              This Privacy Policy does not apply where Lunark AI acts as a data processor and processes personal data on behalf of commercial customers using Lunark AI's Commercial Services – for example, when a commercial customer or their end user includes personal data in Inputs (defined below). In those cases, the commercial customer is the controller, and you can review their policies for more information about how they handle your personal data.
              <br/><br/>
              This Privacy Policy also describes your privacy rights. More information about your rights, and how to exercise them, is set out in the "Rights and Choices" section.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-medium mb-4">1. Collection of Personal Data</h2>
            <h3 className="text-lg font-medium mb-4">Personal data you provide to us directly</h3>
            <p>
              Identity and Contact Data: Lunark AI collects identifiers, such as your name, email address, and phone number when you sign up for an Lunark AI account, or to receive information on our Services. We may also collect or generate indirect identifiers (e.g., "USER12345").
              <br/><br/>
              Payment Information: We may collect your payment information if you choose to purchase access to Lunark AI's products and services.
              <br/><br/>
              Inputs and Outputs: Our AI services allow you to prompt the Services in a variety of media including but not limited to the format of text, files and documents, photos and images, and other materials along with the metadata and other information contained therein ("Prompts" or "Inputs"), which generate responses ("Outputs" or "Completions") based on your Inputs. If you include personal data in your Inputs, we will collect that information and this information may be reproduced in Outputs.
              <br/><br/>
              Communication Information: If you communicate with us, including via our social media accounts, we collect your name, contact information, and the contents of any messages you send.
            </p>
            <h3 className="text-lg font-medium mt-4 mb-4">Personal data we receive automatically from your use of the Services</h3>
            <p>
              When you use the Services, we also receive certain technical data automatically (described below, collectively "Technical Information"). This includes:
              <br/><br/>
              Device and Connection Information. Consistent with your device or browser permissions, your device or browser automatically sends us information about when and how you install, access, or use our Services. This includes information such as your device type, operating system information, browser information and web page referers, mobile network, connection information, mobile operator or internet service provider (ISP), time zone setting, IP address (including information about the location of the device derived from your IP address), identifiers (including device or advertising identifiers, probabilistic identifiers, and other unique personal or online identifiers).
              <br/><br/>
              Usage Information. We collect information about your use of the Services, such as the dates and times of access, browsing history, search, information about the links you click, pages you view, and other information about how you use the Services, and technology on the devices you use to access the Services.
              <br/><br/>
              Log and Troubleshooting Information. We collect information about how our Services are performing when you use them. This information includes log files. If you or your device experiences an error, we may collect information about the error, the time the error occurred, the feature being used, the state of the application when the error occurred, and any communications or content provided at the time the error occurred.
              <br/><br/>
              Cookies & Similar Technologies. We and our service providers use cookies, scripts, or similar technologies ("Cookies") to manage the Services and to collect information about you and your use of the Services. These technologies help us to recognize you, customize or personalize your experience, market additional products or services to you, and analyze the use of our Services to make them safer and more useful to you. For more details about how we use these technologies, and your opt-out controls and other options, please visit our Cookie Policy.
            </p>
            <h3 className="text-lg font-medium mt-4 mb-4">Personal data we collect or receive to train our models</h3>
            <p>
              Lunark AI obtains personal data from third party sources in order to train our models. Specifically, we train our models using data from three sources:
              <br/><br/>
              1. Publicly available information via the Internet
              <br/><br/>
              2. Datasets that we license from third party businesses
              <br/><br/>
              3. Data that our users or crowd workers provide
              <br/><br/>
              We take steps to minimize the privacy impact on individuals through the training process.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-medium mb-4">2. Uses of Personal Data Permitted Under Applicable Data Protection Laws</h2>
            <p>
              We will only use your personal data in accordance with applicable laws. We rely on the following grounds where permitted under and in accordance with data protection laws, such as in the European Union (our "Legal Bases"):
              <br/><br/>
              Where we need it to perform a contract with you. For example, we process Identity and Contact Data, Inputs, Outputs and Payment Information in order to provide Services to you. In circumstances where we do not have a contract with you, such as where you are an end user of our Commercial Services, we instead rely on our legitimate interests.
              <br/><br/>
              Where it is necessary for our legitimate interests (or those of a third party) and your interests and rights do not override our interests. Our legitimate interests include:
              <br/><br/>
              1. Providing, maintaining and improving our products and services;
              <br/><br/>
              2. Research and development, including developing new products and features;
              <br/><br/>
              3. Marketing our products and services;
              <br/><br/>
              4. Detecting, preventing and enforcing violations of our terms including misuse of services, fraud, abuse, and other trust and safety protocols; and
              <br/><br/>
              5. Protecting our rights and the rights of others.
              <br/><br/>
              Where we need to comply with our legal obligations.
              <br/><br/>
              As part of our commitment to improving our services, we use your Inputs and Outputs to train and enhance Lunark AI's capabilities. This data helps us develop more effective and responsive AI systems. However, if legal restrictions apply or are requested, we can implement appropriate solutions to exclude your data from the training process in accordance with applicable laws and regulations.          </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-medium mb-4">3. How We Disclose Personal Data.</h2>
            <p>
              Lunark AI will disclose personal data to the following categories of third parties for the purposes explained in this Policy:
              <br/><br/>
              Affiliates & corporate partners. Lunark AI discloses the categories of personal data described above between and among its affiliates and related entities.
              <br/><br/>
              Service providers & business partners. Lunark AI may disclose the categories of personal data described above with service providers and business partners for a variety of business purposes, including website and data hosting, ensuring compliance with industry standards, research, auditing, and data processing.
              <br/><br/>
              Lunark AI may also disclose personal data in the following circumstances:
              <br/><br/>
              As part of a significant corporate event. If Lunark AI is involved in a merger, corporate transaction, bankruptcy, or other situation involving the transfer of business assets, Lunark AI will disclose your personal data as part of these corporate transactions.
              <br/><br/>
              Third-Party Websites and Services: Our Services may involve integrations with, or may direct you to, websites, apps, and services managed by third parties. By interacting with these third parties, you are providing information directly to the third party and not Lunark AI and subject to the third party's privacy policy.
              <br/>
              If you access third-party services, such as social media sites or other sites linked through the Services (e.g., if you follow a link to our Twitter account), these third-party services will be able to collect personal data about you, including information about your activity on the Services. If we link to a site or service via our Services, you should read their data usage policies or other documentation. Our linking to another site or service doesn't mean we endorse it or speak for that third party.
              <br/><br/>
              Pursuant to regulatory or legal requirements, safety, rights of others, and to enforce our rights or our terms. We may disclose personal data to governmental regulatory authorities as required by law, including for legal, tax or accounting purposes, in response to their requests for such information or to assist in investigations. We may also disclose personal data to third parties in connection with claims, disputes or litigation, when otherwise permitted or required by law, or if we determine its disclosure is necessary to protect the health and safety of you or any other person, to protect against fraud or credit risk, to enforce our legal rights or the legal rights of others, to enforce contractual commitments that you have made, or as otherwise permitted or required by applicable law.
              <br/><br/>
              With an individual's consent. Lunark AI will otherwise disclose personal data when an individual gives us permission or directs us to disclose this information.
              <br/><br/>
              You can find information on our Subprocessor List about the third parties Lunark AI engages to help us process personal data provided to us where Lunark AI acts as a data processor, such as with respect to personal data we receive, process, store, or host when you use Lunark AI's commercial services.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-medium mb-4">4. Rights and Choices</h2>
            <p>
              Subject to applicable law and depending on where you reside, you may have some rights regarding your personal data, as described further below. We make efforts to respond to such requests. However, please be aware that these rights are limited, and that the process by which we may need to action your requests regarding our training dataset are complex. Lunark AI will not discriminate based on the exercising of privacy rights you may have.
              <br/><br/>
              To exercise your rights, you or an authorized agent may submit a request by emailing us. After we receive your request, we may verify it by requesting information sufficient to confirm your identity. You may also have the right to appeal requests that we deny by emailing us.
              <br/><br/>
              Right to know. You may have the right to know what personal data Lunark AI processes about you, including the categories of personal data, the categories of sources from which it is collected, the business or commercial purposes for collection, and the categories of third parties to whom we disclose it.
              <br/><br/>
              Access & data portability. You may have the right to request a copy of the personal data Lunark AI processes about you, subject to certain exceptions and conditions. In certain cases and subject to applicable law, you have the right to port your information.
              <br/><br/>
              Deletion. You may have the right to request that we delete personal data collected from you when you use our Services, subject to certain exceptions. You also are able to delete individual conversations, which will be removed immediately from your conversation history and automatically deleted from our back-end within 30 days.
              <br/><br/>
              Correction. You may have the right to request that we correct inaccurate personal data Lunark AI retains about you, subject to certain exceptions. Please note that we cannot guarantee the factual accuracy of Outputs. If Outputs contain factually inaccurate personal data relating to you, you can submit a correction request and we will make a reasonable effort to correct this information—but due to the technical complexity of our large language models, it may not always be possible for us to do so.
              <br/><br/>
              Objection. You may have a right to object to processing of your personal data, including profiling conducted on grounds of public or legitimate interest. In places where such a right applies, we will no longer process the personal data in case of such objection unless we demonstrate compelling legitimate grounds for the processing which override your interests, rights, and freedoms, or for the establishment, exercise or defense of legal claims. If we use your information for direct marketing, you can object and opt out of future direct marketing messages using the unsubscribe link in such communications.
              <br/><br/>
              Restriction. You have the right to restrict our processing of your personal data in certain circumstances.
              <br/><br/>
              Automated decision-making: Lunark AI does not engage in decision making based solely on automated processing or profiling in a manner which produces a legal effect (i.e., impacts your legal rights) or significantly affects you in a similar way (e.g., significantly affects your financial circumstances or ability to access essential goods or services).
              <br/><br/>
              Sale & targeted Lunark AI marketing of its products and services. Lunark AI does not "sell" your personal data as that term is defined by applicable laws and regulations. If we share your personal data for targeted advertising to promote our products and services in the future, you can opt-out and we will honor global privacy controls.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-medium mb-4">5. Data Transfers</h2>
            <p>
              When you access our website or Services, your personal data may be transferred to our servers in the US, or to other countries outside the European Economic Area (EEA) and the UK. This may be a direct provision of your personal data to us, or a transfer that we or a third party make (the latter being a "Transfer").
              <br/><br/>
              Where information is transferred outside the EEA or the UK, we ensure it benefits from an adequate level of data protection by relying on:
              <br/><br/>
              Adequacy decisions. These are decisions from the European Commission under Article 45 GDPR (or equivalent decisions under other laws) where they recognise that a country outside of the EEA offers an adequate level of data protection. We transfer your information as described in "Collection of Personal Data" to some countries with adequacy decisions, such as the countries listed here; or
              <br/><br/>
              Standard contractual clauses. The European Commission has approved contractual clauses under Article 46 GDPR that allows companies in the EEA to transfer data outside the EEA. These (and their approved equivalent for the UK and Switzerland) are called standard contractual clauses. We rely on standard contractual clauses to transfer information as described in "Collection of Personal Data" to certain affiliates and third parties in countries without an adequacy decision.
              <br/><br/>
              In certain situations, we rely on derogations provided for under applicable data protection law to transfer information to a third country.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-medium mb-4">6. Data Retention, Data Lifecycle, and Security Controls</h2>
            <p>
              Lunark AI retains your personal data for as long as reasonably necessary for the purposes and criteria outlined in this Privacy Policy and explained further in our support center.
              <br/><br/>
              When the personal data collected is no longer required by us, we and our service providers will perform the necessary procedures for destroying, deleting, erasing, or converting it into an anonymous form as permitted or required under applicable laws.
              <br/><br/>
              Aggregated or De-Identified Information: We may process personal data in an aggregated or de-identified form to analyze the effectiveness of our Services, conduct research, study user behavior, and train our AI models as permitted under applicable laws. For instance:
              <br/><br/>
              When you submit Feedback and provide us permission, we disassociate Inputs and Outputs from your user ID to use them for training and improving our models.
              <br/><br/>
              If our systems flag Inputs or Outputs for potentially violating our Usage Policy, we disassociate the content from your user ID to train our trust and safety classification models and internal generative models. However, we may re-identify the materials to enforce our Usage Policy with the responsible user if necessary.
              <br/><br/>
              To improve user experience, we may analyze and aggregate general user behavior and usage data. This information does not identify individual users.
              <br/><br/>
              Security controls relating to our processing of personal data: All personal data we process is protected with industry-standard security controls such as internal access controls and encryption in transit and at rest.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-medium mb-4">7. Children</h2>
            <p>Our Services are not directed towards, and we do not knowingly collect, use, disclose, sell, or share any information about, children under the age of 18. If you become aware that a child under the age of 18 has provided any personal data to us while using our Services, please email us and we will investigate the matter and, if appropriate, delete the personal data.</p>
          </section>
          <section className="mb-48">
            <h2 className="text-xl font-medium mb-4">8. Changes to Our Privacy Policy</h2>
            <p>
              Lunark AI may update this Privacy Policy from time to time. We will notify you of any material changes to this Privacy Policy, as appropriate, and update the Effective Date. We encourage you to review that page for updates when you access the Services.
            </p>
          </section>
        </div>
      </div>
      </main>
 );
}