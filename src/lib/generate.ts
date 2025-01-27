import axios from 'axios';
import { MODELSEnum, TemplateEnum } from './prompt-by-template';

export const generate = async ({
  input,
  selectedTemplate,
  Model,
  syntaxName,
}: {
  input: any;
  selectedTemplate: TemplateEnum;
  Model: MODELSEnum;
  syntaxName: string;
}) => {
  try {
    const syntaxDoc = await import(`./syntax/${syntaxName}/${selectedTemplate.toLowerCase()}.md`);

    const response = await axios.post(
      'http://127.0.0.1:5000/generate/diagram', 
	  
      { Model,
		input,
        syntaxName,
        syntaxDoc: syntaxDoc.default,
        selectedTemplate, },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.response;
  } catch (error: any) {
    console.error('Error generating UML diagram:', error.response?.data || error.message);
    throw error;
  }
};