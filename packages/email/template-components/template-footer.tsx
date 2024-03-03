import { Section, Text } from '../components';

export type TemplateFooterProps = {
  isDocument?: boolean;
};

export const TemplateFooter = ({ isDocument = true }: TemplateFooterProps) => {
  return (
    <Section>
      <Text className="my-8 text-sm text-slate-400">
        Blackstone Studio, LLC.
        <br />
        30 N. Gould St. Ste R, Sheridan WY 82801, USA
      </Text>
    </Section>
  );
};

export default TemplateFooter;
