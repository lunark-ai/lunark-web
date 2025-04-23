"use client"

import { motion } from "framer-motion";
import Image from "next/image";

export default function TermsOfService() {
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
          <h1 className="text-2xl font-semibold mb-8">Terms of Service</h1>
          <section className="mb-8">
            <h2 className="text-xl font-medium mb-4">1. Who we are</h2>
            <p>
              At Lunark AI, we're changing the way people connect with blockchain technology. Think of Lunark AI as your friendly blockchain companion - it understands natural language and handles all your crypto tasks without the technical headaches. No more wrestling with complex commands or technical jargon.
              <br/><br/>
              We started Lunark AI because we believe blockchain shouldn't be just for tech experts. Whether you want to transfer tokens, interact with smart contracts, or manage your crypto assets, just tell Lunark AI what you want to do in your own words. It's like having a knowledgeable friend who speaks both human and blockchain.
              <br/><br/>
              We're passionate about making blockchain accessible to everyone while keeping your transactions secure and reliable. Our AI technology translates your natural conversations into precise blockchain operations, so you can focus on what you want to do, not how to do it.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-medium mb-4">2. Account creation and access.</h2>
            <p>Minimum age. You must be at least 18 years old or the minimum age required to consent to use the Services in your location, whichever is higher.</p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-medium mb-4">3. Use of our Services.</h2>
            <p>
              You may access and use our Services only in compliance with our Terms, and any guidelines or supplemental terms we may post on the Services (the "Permitted Use").
              <br/><br/>
              You may not access or use, or help another person to access or use, our Services in the following ways:
              <br/><br/>
              1. In any manner that violates any applicable law or regulation—including, without limitation, any laws about exporting data or software to and from the United States or other countries.
              <br/><br/>
              2. To develop any products or services that compete with our Services, including to develop or train any artificial intelligence or machine learning algorithms or models.
              <br/><br/>
              3. To decompile, reverse engineer, disassemble, or otherwise reduce our Services to human-readable form, except when these restrictions are prohibited by applicable law.
              <br/><br/>
              4. To crawl, scrape, or otherwise harvest data or information from our Services other than as permitted under these Terms.
              <br/><br/>
              5. To use our Services or Materials to obtain unauthorized access to any system or information, or to deceive any person.
              <br/><br/>
              6. To infringe, misappropriate, or violate intellectual property or other legal rights (including the rights of publicity or privacy).
              <br/><br/>
              7. To engage in any other conduct that restricts or inhibits any person from using or enjoying our Services, or that we reasonably believe exposes us—or any of our users, affiliates, or any other third party—to any liability, damages, or detriment of any type, including reputational harms.
              <br/><br/>
              You also must not abuse, harm, interfere with, or disrupt our Services, including, for example, introducing viruses or malware, spamming or DDoSing Services, or bypassing any of our systems or protective measures.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-medium mb-4">4. Prompts, Outputs, and Materials.</h2>
            <p>
              You may be allowed to submit text, documents, or other materials to our Services for processing (we call these "Prompts"). Our Services may generate responses based on your Prompts (we call these "Outputs"). Prompts and Outputs collectively are "Materials."
              <br/><br/>
              Rights to Materials. You are responsible for all Prompts you submit to our Services. By submitting Prompts to our Services, you represent and warrant that you have all rights, licenses, and permissions that are necessary for us to process the Prompts under our Terms. You also represent and warrant that your submitting Prompts to us will not violate our Terms, our Acceptable Use Policy, or any laws or regulations applicable to those Prompts. As between you and Lunark AI, and to the extent permitted by applicable law, you retain any right, title, and interest that you have in the Prompts you submit. Subject to your compliance with our Terms, we assign to you all of our right, title, and interest—if any—in Outputs.
              <br/><br/>
              Reliance on Outputs. Artificial intelligence and large language models are frontier technologies that are still improving in accuracy, reliability and safety. When you use our Services, you acknowledge and agree:
              <br/><br/>
              1. Outputs may not always be accurate and may contain material inaccuracies even if they appear accurate because of their level of detail or specificity.
              <br/><br/>
              2. You should not rely on any Outputs without independently confirming their accuracy.
              <br/><br/>
              3. The Services and any Outputs may not reflect correct, current, or complete information.
              <br/><br/>
              4. Outputs may contain content that is inconsistent with Lunark AI's views.
              <br/><br/>
              Blockchain Transaction Risks and Liability. You acknowledge and agree that:
              <br/><br/>
              1. Blockchain transactions are irreversible by nature, and any errors in transaction details, including but not limited to incorrect wallet addresses, token amounts, or network selections, may result in permanent loss of assets.
              <br/><br/>
              2. You are solely responsible for verifying all transaction details before confirming any blockchain operations through our Services. 
              <br/><br/>
              3. Lunark AI bear no responsibility for any losses, damages, or errors that may occur while using our Services, including but not limited to: lost or stolen cryptocurrencies; transactions sent to incorrect addresses whether due to user error or system-generated parameters; losses caused by network congestion, failed transactions, or blockchain network issues; any assets lost through smart contract interactions regardless of how they were initiated; financial losses stemming from user error, misconduct, or compromised credentials; market volatility and cryptocurrency value fluctuations; any errors or losses resulting from transactions prepared or parameters interpreted by our AI system; any issues arising from third-party smart contract interactions including bugs, vulnerabilities, or exploitation; damages caused by third-party integrations, services, protocols, or platform failures; and any other financial or technical complications that may arise during blockchain operations through our platform. Users acknowledge that blockchain technology and cryptocurrency transactions carry inherent risks, and Lunark AI cannot guarantee the security, accuracy, or successful execution of any blockchain operations conducted through our Services.
              <br/><br/>
              4. While our AI technology aims to facilitate accurate blockchain interactions, you understand that you must independently verify all transaction details before confirmation, as the final responsibility for any blockchain transaction lies solely with you.
              <br/><br/>
              5. We strongly recommend testing with small amounts first when conducting new types of transactions or interacting with unfamiliar smart contracts.
              <br/><br/>
              6. You acknowledge that blockchain technology and cryptocurrency markets involve significant risks, and you accept full responsibility for any decisions made while using our Services for blockchain interactions.
              <br/><br/>
              7. You understand and acknowledge that while our AI system is designed to process and execute blockchain transactions, it may make errors in transaction preparation or interpretation of commands. Our AI system's potential errors include, but are not limited to, misinterpreting natural language inputs or user intentions, generating incorrect transaction parameters, making errors in token amount calculations, suggesting inappropriate gas fees, and incorrectly processing smart contract interactions. Given these inherent risks in AI-assisted blockchain operations, users must exercise extreme caution and thoroughly verify all transaction details before confirmation, regardless of how they were prepared or suggested by our AI system. The responsibility for verifying and approving any transaction parameters, including recipient addresses, token amounts, network fees, and smart contract interactions, lies solely with the user.
              <br/><br/>
              Therefore, you explicitly agree that you are solely responsible for reviewing and verifying all transaction details before confirmation, regardless of how they were prepared or suggested by our AI. Any transaction executed through our platform, whether correctly prepared by AI or not, is your sole responsibility and you assume all associated risks and potential losses.
              <br/><br/>
              Our use of Materials. We utilize user inputs and interactions to power our autonomous AI agent's learning process. By engaging with Lunark AI, users should understand that every interaction contributes to the platform's continuous self-improvement and adaptive learning capabilities. Our AI systematically processes and learns from Materials to enhance its intelligence, understanding, and performance across various blockchain interactions and user experiences.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-medium mb-4">5. Feedback</h2>
            <p>We appreciate feedback, including ideas and suggestions for improvement. You have no obligation to give us Feedback, but if you do, you agree that we may use the Feedback however we choose without any obligation or other payment to you.</p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-medium mb-4">6. Payments and Fees</h2>
            <p>
              You are required to add funds to your Lunark AI account balance to access and utilize our blockchain services. Users must provide complete and accurate payment information when loading funds.
              <br/><br/>
              We accept various payment methods for balance loading, including cryptocurrency transfers, and credit/debit card payments (in future). Each blockchain transaction or service will deduct the corresponding amount from your account balance.
              <br/><br/>
              Charges are processed based on the specific blockchain services and operations you perform. Transaction fees are transparently displayed before execution to ensure user awareness.
              <br/><br/>
              Please note that balance additions are final and non-refundable. Users are strongly advised to carefully review their account and transaction details before confirming payments.
              <br/><br/>
              By adding funds to your Lunark AI account, you acknowledge and accept these payment terms.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-medium mb-4">7. Third-party services and links</h2>
            <p>Our Services may use or be used in connection with third-party content, services, or integrations. We do not control or accept responsibility for any loss or damage that may arise from your use of any third-party content, services, and integrations, for which we make no representations or warranties. Your use of any third-party content, services, and integrations is at your own risk and subject to any terms, conditions, or policies (including privacy policies) applicable to such third-party content, services, and integrations.</p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-medium mb-4">8. Software</h2>
            <p>We may offer manual or automatic updates to our software including our apps ("Lunark AI Software"), without advance notice to you. Lunark AI Software may include open source software. In the event of any conflict between these Terms and any other Lunark AI or third-party terms applicable to any portion of Lunark AI Software, such as open-source license terms, such other terms will control as to that portion of the Lunark AI Software and to the extent of the conflict.</p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-medium mb-4">9. Ownership of the Services</h2>
            <p>The Services are owned, operated, and provided by us and our affiliates, licensors, distributors, and service providers (collectively "Providers"). We and our Providers retain all of our respective rights, title, and interest, including intellectual property rights, in and to the Services. Other than the rights of access and use expressly granted in our Terms, our Terms do not grant you any right, title, or interest in or to our Services.</p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-medium mb-4">10. Disclaimer of warranties, limitations of liability, and indemnity</h2>
            <p>
              Our team works hard to provide great services, and we're continuously working on improvements. However, there are certain aspects we can't guarantee. We are using ALL CAPS to explain this, to make sure that you see it.
              <br/><br/>
              YOUR USE OF THE SERVICES AND MATERIALS IS SOLELY AT YOUR OWN RISK. THE SERVICES AND OUTPUTS ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS AND, TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, ARE PROVIDED WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY. WE AND OUR PROVIDERS EXPRESSLY DISCLAIM ANY AND ALL WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, TITLE, MERCHANTABILITY, ACCURACY, AVAILABILITY, RELIABILITY, SECURITY, PRIVACY, COMPATIBILITY, NON-INFRINGEMENT, AND ANY WARRANTY IMPLIED BY COURSE OF DEALING, COURSE OF PERFORMANCE, OR TRADE USAGE.
              <br/><br/>
              TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, IN NO EVENT WILL WE, OUR PROVIDERS, OR OUR OR THEIR RESPECTIVE AFFILIATES, INVESTORS, DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, SUCCESSORS OR ASSIGNS (COLLECTIVELY, THE "LUNARK AI PARTIES"), BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR OTHER DAMAGES ARISING OUT OF OR IN ANY WAY RELATED TO THE SERVICES, THE MATERIALS, OR THESE TERMS, WHETHER BASED IN CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR OTHER THEORY, EVEN IF ANY LUNARK AI PARTIES HAVE BEEN ADVISED OF THE POSSIBILITY OF DAMAGES, AND EVEN IF THE DAMAGES ARE FORESEEABLE.
              <br/><br/>
              TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, THE LUNARK AI PARTIES' TOTAL AGGREGATE LIABILITY TO YOU FOR ALL DAMAGES, LOSSES AND CAUSES OF ACTION ARISING OUT OF OR IN ANY WAY RELATED TO THE SERVICES, THE MATERIALS, OR THESE TERMS, WHETHER IN CONTRACT, TORT (INCLUDING NEGLIGENCE) OR OTHERWISE, WILL NOT EXCEED THE GREATER OF THE AMOUNT YOU PAID TO US FOR ACCESS TO OR USE OF THE SERVICES (IF ANY) IN THE SIX MONTHS PRECEDING THE DATE SUCH DAMAGES, LOSSES, AND CAUSES OF ACTION FIRST AROSE, AND $10. THE FOREGOING LIMITATIONS ARE ESSENTIAL TO THESE TERMS, AND WE WOULD NOT OFFER THE SERVICES TO YOU UNDER THESE TERMS WITHOUT THESE LIMITATIONS.
              <br/><br/>
              YOU AGREE TO INDEMNIFY AND HOLD HARMLESS THE LUNARK AI PARTIES FROM AND AGAINST ANY AND ALL LIABILITIES, CLAIMS, DAMAGES, EXPENSES (INCLUDING REASONABLE ATTORNEYS' FEES AND COSTS), AND OTHER LOSSES ARISING OUT OF OR RELATED TO YOUR BREACH OR ALLEGED BREACH OF THESE TERMS; YOUR ACCESS TO, USE OF, OR ALLEGED USE OF THE SERVICES OR THE MATERIALS; YOUR FEEDBACK; ANY PRODUCTS OR SERVICES THAT YOU DEVELOP, OFFER, OR OTHERWISE MAKE AVAILABLE USING OR OTHERWISE IN CONNECTION WITH THE SERVICES; YOUR VIOLATION OF APPLICABLE LAW OR ANY THIRD-PARTY RIGHT; AND ANY ACTUAL OR ALLEGED FRAUD, INTENTIONAL MISCONDUCT, GROSS NEGLIGENCE, OR CRIMINAL ACTS COMMITTED BY YOU OR YOUR EMPLOYEES OR AGENTS. WE RESERVE THE RIGHT TO ENGAGE SEPARATE COUNSEL AND PARTICIPATE IN OR ASSUME THE EXCLUSIVE DEFENSE AND CONTROL OF ANY MATTER OTHERWISE SUBJECT TO INDEMNIFICATION BY YOU HEREUNDER, IN WHICH CASE YOU AGREE TO COOPERATE WITH US AND SUCH SEPARATE COUNSEL AS WE REASONABLY REQUEST.
              <br/><br/>
              THE LAWS OF SOME JURISDICTIONS DO NOT ALLOW THE DISCLAIMER OF IMPLIED WARRANTIES OR CERTAIN TYPES OF DAMAGES, SO SOME OR ALL OF THE DISCLAIMERS AND LIMITATIONS OF LIABILITY IN THESE TERMS MAY NOT APPLY TO YOU.
              <br/><br/>
              OUR PROVIDERS ARE INTENDED THIRD PARTY BENEFICIARIES OF THE WARRANTY DISCLAIMERS AND LIMITATIONS OF LIABILITY CONTAINED IN THIS SECTION 10.
              <br/><br/>
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-medium mb-4">11. General terms</h2>
            <p>
              Changes to the Services. Our Services are novel and will change. We may sometimes add or remove features, increase or decrease capacity limits, offer new Services, or stop offering certain Services.
              <br/><br/>
              Unless we specifically agree otherwise in a separate agreement with you, we reserve the right to modify, suspend, or discontinue the Services or your access to the Services, in whole or in part, at any time without notice to you. Although we will strive to provide you with reasonable advance notice if we stop offering a Service, there may be urgent situations—such as preventing abuse, responding to legal requirements, or addressing security and operability issues—where providing advance notice is not feasible. We will not be liable for any change to or any suspension or discontinuation of the Services or your access to them.
              <br/><br/>
              Changes to these terms. We may revise and update these Terms at our discretion. Some examples of times, we may update these Terms include (1) to reflect changes in our Services, like when we add or remove features or services, or update our pricing, (2) for security or legal reasons, or (3) to promote safety or prevent abuse. If you continue to access the Services after we post the updated Terms on Lunark AI's website or otherwise give you notice of Terms changes, then you agree to the updated Terms. If you do not accept the updated Terms, you must stop using our Services.
              <br/><br/>
              Supplemental terms. We may offer Services or features that we believe require service-specific terms or guidelines. When using our Services, you agree to comply with any applicable guidelines, rules, or supplemental terms that may be posted on the Services from time to time ("Supplemental Terms"). If these Terms conflict with Supplemental Terms, the Supplemental Terms will govern for the applicable Service.  
              <br/><br/>
              Entire agreement. These Terms and any other terms expressly incorporated by reference form the entire agreement between you and us regarding the subject matter of our Terms.
              <br/><br/>
              Termination. You may stop accessing the Services at any time. We may suspend or terminate your access to the Services (including any balances) at any time without notice to you if we believe that you have breached these Terms, or if we must do so in order to comply with law. If we terminate your access to the Services due to a violation of these Terms and you have a balance, you will not be entitled to any refund. In addition, if you have a balance, we may terminate the balance at any time for any other reason. 
              <br/><br/>
              We may also terminate your Account if you have been inactive for over a year and you do not have a paid Account. If we terminate your Account due to inactivity, we will provide you with notice before doing so.
              <br/><br/>
              Upon termination of these Terms, a balance, or your access to the Services, we may at our option delete any Materials or other data associated with your Account. Sections 6 (with respect to fees outstanding as of such expiration or termination) and 9 – 12 will survive any expiration or termination of our Terms.
              <br/><br/>
              Severability. If a particular Term or portion of these Terms is not valid or enforceable, this will have no effect on any other Terms.
              <br/><br/>
              No waiver. Any delay or failure on our part to enforce a provision of these Terms is not a waiver of our right to enforce them later.
              <br/><br/>
              No assignment. These Terms may not be transferred or assigned by you without our prior written consent, but may be assigned by us without restriction.
              <br/><br/>
              Use of our brand. You may not, without our prior written permission, use our name, logos, or other trademarks in connection with products or services other than the Services, or in any other way that implies our affiliation, endorsement, or sponsorship. To seek permission, please email us.
              <br/><br/>
              Export Controls. You may not export or provide access to the Services into any U.S. embargoed countries or to anyone on (i) the U.S. Treasury Department's list of Specially Designated Nationals, (ii) any other restricted party lists identified by the Office of Foreign Asset Control, (iii) the U.S. Department of Commerce Denied Persons List or Entity List, or (iv) any other restricted party lists. You represent and warrant that you and anyone accessing or using the Services on your behalf, or using your Account credentials, are not such persons or entities and are not located in any such country.
              <br/><br/>
              Legal Compliance. We may comply with governmental, court, and law enforcement requests or requirements relating to provision or use of the Services, or to information provided to or collected under our Terms. We reserve the right, at our sole discretion, to report information from or about you, including but not limited to Prompts or Outputs, to law enforcement.
              <br/><br/>
              U.S. Government Use. The Services were developed solely at private expense and are commercial computer software and commercial computer software documentation within the meaning of the applicable Federal Acquisition Regulations and their agency supplements. Accordingly, U.S. Government users of the Services will have only those rights that are granted to all other end users of the Services pursuant to these Terms.
            </p>
          </section>
          <section className="mb-48">
            <h2 className="text-xl font-medium mb-4">12. In case of disputes</h2>
            <p>
              Equitable relief. You agree that (a) no adequate remedy exists at law if you breach Section 3 (Use of Our Services); (b) it would be difficult to determine the damages resulting from such breach, and any such breach would cause irreparable harm; and (c) a grant of injunctive relief provides the best remedy for any such breach. You waive any opposition to such injunctive relief, as well as any demand that we prove actual damage or post a bond or other security in connection with such injunctive relief.
              <br/><br/>
              Governing law and exclusive jurisdiction. Our Terms will be governed by, and construed and interpreted in accordance with, the laws of the State of California without giving effect to conflict of law principles. You and Lunark AI agree that any disputes arising out of or relating to these Terms will be resolved exclusively in the state or federal courts located in San Francisco, California, and you and Lunark AI submit to the personal and exclusive jurisdiction of those courts. By accessing our Services, you waive any claims that may arise under the laws of other jurisdictions.
            </p>
          </section>
        </div>
      </div>
      </main>
 );
}