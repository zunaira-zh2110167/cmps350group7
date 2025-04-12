import fs from 'fs';
import path from 'path';

// saving the json file path
const filePath = path.join(process.cwd(), 'mizan_app', 'mizan-data', 'comments.json');

// get thr comments
export default function handler(req, res) {
  if (req.method === 'GET') {
    const courseId = req.query.courseId;
    const data = JSON.parse(fs.readFileSync(filePath));
    const filtered = data.filter(comment => comment.courseId === courseId);
    res.status(200).json(filtered); 
  }

  // add a new comment
  else if (req.method === 'POST') {
    const comment = req.body;
    const data = JSON.parse(fs.readFileSync(filePath));
    comment.id = Date.now().toString();
    data.push(comment); 
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); 
    res.status(201).json(comment);
  }

  else {
    res.status(405).json({ message: 'Not allowed' });
  }
}
