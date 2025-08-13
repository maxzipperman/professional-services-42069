import LeadMagnet from '@/components/LeadMagnet';

const LeadMagnetSection = () => (
  <section className="py-12 bg-dp-bg">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        <LeadMagnet
          industry="professional services"
          title="Professional Services ROI Playbook"
          description="A comprehensive guide to measuring, improving, and communicating your website's ROI."
          benefits={[
            'ROI model template',
            '10 CRO quick wins',
            'Analytics setup checklist',
            'Executive summary one-pager'
          ]}
          fileName="professional-services-roi-playbook.pdf"
        />
      </div>
    </div>
  </section>
);

export default LeadMagnetSection;

